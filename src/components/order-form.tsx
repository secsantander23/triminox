"use client";

import { useEffect, useId, useRef, useState } from "react";
import { KIT_OPTIONS } from "@/lib/content";

type Fields = {
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  quantidade: string;
  kit: string;
  mensagem: string;
  consentimento: boolean;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  nome: "",
  email: "",
  telefone: "",
  cidade: "",
  quantidade: "1",
  kit: "imperial",
  mensagem: "",
  consentimento: false,
};

/** Máscara de telefone brasileiro, não invasiva. */
function maskPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validate(values: Fields): Errors {
  const e: Errors = {};

  if (!values.nome.trim()) {
    e.nome = "Informe seu nome para identificarmos o pedido.";
  } else if (values.nome.trim().length < 3) {
    e.nome = "O nome precisa ter pelo menos 3 caracteres.";
  }

  if (!values.email.trim()) {
    e.email = "Precisamos do e-mail para enviar a confirmação.";
  } else if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(values.email.trim())) {
    e.email = "Esse e-mail não parece completo. Exemplo: nome@dominio.com.br";
  }

  const digits = values.telefone.replace(/\D/g, "");
  if (!digits) {
    e.telefone = "Informe um telefone com DDD para combinarmos a entrega.";
  } else if (digits.length < 10) {
    e.telefone = "Faltam dígitos. Use o formato (00) 00000-0000.";
  }

  if (!values.cidade.trim()) {
    e.cidade = "Para onde enviamos o baralho?";
  }

  const qtd = Number(values.quantidade);
  if (!Number.isFinite(qtd) || qtd < 1) {
    e.quantidade = "A quantidade mínima é 1.";
  } else if (qtd > 20) {
    e.quantidade = "Para mais de 20 unidades, fale com a gente pelo e-mail.";
  }

  if (!values.consentimento) {
    e.consentimento = "Precisamos da sua autorização para enviar o pedido.";
  }

  return e;
}

const FIELD_LABELS: Record<keyof Fields, string> = {
  nome: "Nome",
  email: "E-mail",
  telefone: "Telefone",
  cidade: "Cidade",
  quantidade: "Quantidade",
  kit: "Kit",
  mensagem: "Mensagem",
  consentimento: "Autorização",
};

export function OrderForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [banner, setBanner] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const summaryRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  // Após uma submissão falha, o foco vai para o resumo de erros (WCAG).
  useEffect(() => {
    if (submitted && Object.keys(errors).length > 0) {
      summaryRef.current?.focus();
    }
  }, [submitted, errors]);

  const errorEntries = Object.entries(errors) as Array<[keyof Fields, string]>;

  const setField = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    // Revalida só o campo já tocado, para o erro sumir na hora em que corrigir.
    if (touched[key]) {
      setErrors((prev) => {
        const copy = { ...prev };
        const fresh = validate(next);
        if (fresh[key]) copy[key] = fresh[key];
        else delete copy[key];
        return copy;
      });
    }
  };

  const handleBlur = (key: keyof Fields) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => {
      const fresh = validate(values);
      const copy = { ...prev };
      if (fresh[key]) copy[key] = fresh[key];
      else delete copy[key];
      return copy;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus("error");
      setBanner(
        `Não foi possível enviar: ${Object.keys(found).length} ${
          Object.keys(found).length === 1 ? "campo precisa" : "campos precisam"
        } de atenção.`,
      );
      return;
    }

    setStatus("sending");
    setBanner("Enviando seu pedido…");

    // Sem back-end: monta o e-mail e abre o cliente de correio do usuário.
    const kit = KIT_OPTIONS.find((k) => k.id === values.kit);
    const corpo = [
      "Pedido Triminox",
      "---------------",
      `Nome: ${values.nome}`,
      `E-mail: ${values.email}`,
      `Telefone: ${values.telefone}`,
      `Cidade: ${values.cidade}`,
      `Kit: ${kit?.name ?? values.kit} (${kit?.price ?? ""})`,
      `Quantidade: ${values.quantidade}`,
      "",
      values.mensagem ? `Mensagem:\n${values.mensagem}` : "Sem mensagem adicional.",
    ].join("\n");

    const href = `mailto:pedido@triminox.com.br?subject=${encodeURIComponent(
      `Pedido Triminox — ${values.nome}`,
    )}&body=${encodeURIComponent(corpo)}`;

    window.location.href = href;
    setStatus("sent");
    setBanner("Pedido montado! Abrimos seu e-mail para você revisar e enviar.");
  };

  const errId = (key: keyof Fields) => `${uid}-${key}-erro`;
  const hintId = (key: keyof Fields) => `${uid}-${key}-dica`;

  const describedBy = (key: keyof Fields) =>
    [errors[key] ? errId(key) : null, hintId(key)]
      .filter(Boolean)
      .join(" ") || undefined;

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-aureum-500/40 bg-porphyry-900/30 p-8 text-center">
        <div
          className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-aureum-500/15"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="size-7 text-aureum-400">
            <path
              d="M4 12.5l5 5L20 6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-semibold text-travertine-50">
          Pedido preparado
        </h3>
        <p className="mx-auto mt-3 max-w-[46ch] text-travertine-300">
          Abrimos seu aplicativo de e-mail com o resumo do pedido. Se não
          abriu, copie os dados e envie para{" "}
          <span className="text-aureum-400">pedido@triminox.com.br</span>.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setTouched({});
            setErrors({});
            setSubmitted(false);
            setStatus("idle");
            setBanner("");
          }}
          className="mt-7 inline-flex min-h-12 items-center rounded-md border border-travertine-300/25 px-6 text-sm text-travertine-100 transition-colors hover:border-aureum-400/70"
        >
          Fazer outro pedido
        </button>
      </div>
    );
  }

  const inputBase =
    "w-full min-h-13 rounded-md border bg-ink-900/60 px-4 py-3 text-base text-travertine-50 placeholder:text-travertine-400/60 transition-colors focus:border-aureum-400 focus:outline-none focus-visible:outline-none";
  const inputErr = "border-porphyry-500";

  return (
    <form onSubmit={handleSubmit} noValidate className="relative">
      <div
        role="status"
        aria-live="polite"
        className="sr-only"
        id={`${uid}-status`}
      >
        {banner}
      </div>

      {submitted && errorEntries.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          className="mb-8 rounded-md border border-porphyry-500/60 bg-porphyry-900/40 p-5"
        >
          <h3 className="font-display text-lg font-semibold text-travertine-50">
            Confira {errorEntries.length}{" "}
            {errorEntries.length === 1 ? "campo" : "campos"}
          </h3>
          <ul className="mt-3 space-y-1.5">
            {errorEntries.map(([key, msg]) => (
              <li key={key}>
                <a
                  href={`#${uid}-${key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`${uid}-${key}`)?.focus();
                  }}
                  className="inline-block rounded text-sm text-aureum-300 underline underline-offset-4 hover:text-aureum-200"
                >
                  {FIELD_LABELS[key]}: {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Kit */}
      <fieldset className="mb-8">
        <legend className="mb-4 block text-sm font-semibold text-travertine-100">
          Escolha o kit
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {KIT_OPTIONS.map((kit) => {
            const selected = values.kit === kit.id;
            return (
              <label
                key={kit.id}
                className={`group relative flex cursor-pointer flex-col rounded-lg border p-4 transition-all duration-200 ${
                  selected
                    ? "border-aureum-400 bg-porphyry-900/40 shadow-lg shadow-black/30"
                    : "border-travertine-300/18 bg-ink-900/40 hover:border-travertine-300/40"
                }`}
              >
                <input
                  type="radio"
                  name="kit"
                  value={kit.id}
                  checked={selected}
                  onChange={() => setField("kit", kit.id)}
                  className="sr-only"
                />
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`flex size-4 items-center justify-center rounded-full border-2 transition-colors ${
                      selected
                        ? "border-aureum-400 bg-aureum-400"
                        : "border-travertine-300/40"
                    }`}
                  >
                    {selected ? (
                      <span className="size-1.5 rounded-full bg-ink-950" />
                    ) : null}
                  </span>
                  <span className="font-display text-base font-semibold text-travertine-50">
                    {kit.name}
                  </span>
                </span>
                <span className="numeral mt-1.5 text-lg font-bold text-aureum-400">
                  {kit.price}
                </span>
                <span className="mt-1 text-xs leading-snug text-travertine-300">
                  {kit.description}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor={`${uid}-nome`}
            className="mb-2 block text-sm font-medium text-travertine-100"
          >
            Nome completo <span className="text-porphyry-500">*</span>
          </label>
          <input
            id={`${uid}-nome`}
            name="nome"
            type="text"
            autoComplete="name"
            value={values.nome}
            onChange={(e) => setField("nome", e.target.value)}
            onBlur={() => handleBlur("nome")}
            aria-invalid={!!errors.nome}
            aria-describedby={describedBy("nome")}
            aria-required="true"
            className={`${inputBase} ${errors.nome ? inputErr : "border-travertine-300/20"}`}
          />
          {errors.nome ? (
            <p id={errId("nome")} className="mt-2 text-sm text-porphyry-500">
              {errors.nome}
            </p>
          ) : (
            <p id={hintId("nome")} className="mt-2 text-xs text-travertine-400">
              Usamos apenas para identificar o pedido.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${uid}-email`}
            className="mb-2 block text-sm font-medium text-travertine-100"
          >
            E-mail <span className="text-porphyry-500">*</span>
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            aria-required="true"
            className={`${inputBase} ${errors.email ? inputErr : "border-travertine-300/20"}`}
          />
          {errors.email ? (
            <p id={errId("email")} className="mt-2 text-sm text-porphyry-500">
              {errors.email}
            </p>
          ) : (
            <p id={hintId("email")} className="mt-2 text-xs text-travertine-400">
              Enviamos a confirmação por aqui.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${uid}-telefone`}
            className="mb-2 block text-sm font-medium text-travertine-100"
          >
            Telefone <span className="text-porphyry-500">*</span>
          </label>
          <input
            id={`${uid}-telefone`}
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(00) 00000-0000"
            value={values.telefone}
            onChange={(e) => setField("telefone", maskPhone(e.target.value))}
            onBlur={() => handleBlur("telefone")}
            aria-invalid={!!errors.telefone}
            aria-describedby={describedBy("telefone")}
            aria-required="true"
            className={`${inputBase} ${errors.telefone ? inputErr : "border-travertine-300/20"}`}
          />
          {errors.telefone ? (
            <p id={errId("telefone")} className="mt-2 text-sm text-porphyry-500">
              {errors.telefone}
            </p>
          ) : (
            <p id={hintId("telefone")} className="mt-2 text-xs text-travertine-400">
              Com DDD, para combinarmos a entrega.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${uid}-cidade`}
            className="mb-2 block text-sm font-medium text-travertine-100"
          >
            Cidade <span className="text-porphyry-500">*</span>
          </label>
          <input
            id={`${uid}-cidade`}
            name="cidade"
            type="text"
            autoComplete="address-level2"
            value={values.cidade}
            onChange={(e) => setField("cidade", e.target.value)}
            onBlur={() => handleBlur("cidade")}
            aria-invalid={!!errors.cidade}
            aria-describedby={describedBy("cidade")}
            aria-required="true"
            className={`${inputBase} ${errors.cidade ? inputErr : "border-travertine-300/20"}`}
          />
          {errors.cidade ? (
            <p id={errId("cidade")} className="mt-2 text-sm text-porphyry-500">
              {errors.cidade}
            </p>
          ) : (
            <p id={hintId("cidade")} className="mt-2 text-xs text-travertine-400">
              Calculamos o frete a partir daqui.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${uid}-quantidade`}
            className="mb-2 block text-sm font-medium text-travertine-100"
          >
            Quantidade
          </label>
          <input
            id={`${uid}-quantidade`}
            name="quantidade"
            type="number"
            inputMode="numeric"
            min={1}
            max={20}
            value={values.quantidade}
            onChange={(e) => setField("quantidade", e.target.value)}
            onBlur={() => handleBlur("quantidade")}
            aria-invalid={!!errors.quantidade}
            aria-describedby={describedBy("quantidade")}
            className={`${inputBase} ${errors.quantidade ? inputErr : "border-travertine-300/20"}`}
          />
          {errors.quantidade ? (
            <p id={errId("quantidade")} className="mt-2 text-sm text-porphyry-500">
              {errors.quantidade}
            </p>
          ) : (
            <p id={hintId("quantidade")} className="mt-2 text-xs text-travertine-400">
              Acima de 20, fale com a gente.
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={`${uid}-mensagem`}
            className="mb-2 block text-sm font-medium text-travertine-100"
          >
            Mensagem
            <span className="ml-2 text-xs font-normal text-travertine-400">
              opcional
            </span>
          </label>
          <textarea
            id={`${uid}-mensagem`}
            name="mensagem"
            rows={4}
            value={values.mensagem}
            onChange={(e) => setField("mensagem", e.target.value)}
            aria-describedby={hintId("mensagem")}
            className={`${inputBase} resize-y border-travertine-300/20`}
          />
          <p id={hintId("mensagem")} className="mt-2 text-xs text-travertine-400">
            Pedido para Schools, presente, ou dúvida sobre o frete?
          </p>
        </div>
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            id={`${uid}-consentimento`}
            name="consentimento"
            type="checkbox"
            checked={values.consentimento}
            onChange={(e) => {
              setField("consentimento", e.target.checked);
              setTouched((t) => ({ ...t, consentimento: true }));
            }}
            onBlur={() => handleBlur("consentimento")}
            aria-invalid={!!errors.consentimento}
            aria-describedby={
              errors.consentimento
                ? `${errId("consentimento")} ${hintId("consentimento")}`
                : hintId("consentimento")
            }
            aria-required="true"
            className="mt-0.5 size-5 shrink-0 accent-aureum-500"
          />
          <span className="text-sm leading-relaxed text-travertine-200">
            Autorizo o contato da equipe Triminox sobre este pedido e aceito a{" "}
            <span className="text-travertine-400">
              política de privacidade
            </span>
            . <span className="text-porphyry-500">*</span>
          </span>
        </label>
        {errors.consentimento ? (
          <p
            id={errId("consentimento")}
            className="mt-2 text-sm text-porphyry-500"
          >
            {errors.consentimento}
          </p>
        ) : (
          <p id={hintId("consentimento")} className="sr-only">
            Campo obrigatório.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-md bg-aureum-500 px-8 text-base font-semibold text-ink-950 shadow-lg shadow-aureum-900/30 transition-all duration-200 hover:bg-aureum-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
      >
        {status === "sending" ? (
          <>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-5 animate-spin"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeOpacity="0.25"
              />
              <path
                d="M21 12a9 9 0 00-9-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            Enviando…
          </>
        ) : (
          <>
            Confirmar pedido
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-travertine-400">
        Campos com <span className="text-porphyry-500">*</span> são obrigatórios.
        Sem pagamento online — acertamos tudo por e-mail ou Pix.
      </p>
    </form>
  );
}