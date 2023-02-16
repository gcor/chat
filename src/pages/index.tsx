import { ReactNode, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import styles from "@/styles/Home.module.css";
import TextareaAutosize from "react-textarea-autosize";
import classNames from "classnames";

const DEFAULT_QUESTION = "Расскажи рандомный факт";

function Layout({ children }: { children: ReactNode }) {
  return <div className={styles.main}>{children}</div>;
}

function Question({
  onAsk,
  canAsk,
}: {
  onAsk: (question: string) => void;
  canAsk: boolean;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAsk(inputRef.current?.value || "");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e as any);
    }
  }

  return (
    <form className={styles.question} onSubmit={handleSubmit}>
      <TextareaAutosize
        ref={inputRef}
        className={styles.question__input}
        disabled={!canAsk}
        defaultValue={DEFAULT_QUESTION}
        minLength={10}
        required
        onKeyDown={handleKeyDown}
      />
      <button
        className={classNames(styles.button, styles.question__submit)}
        disabled={!canAsk}
        type="submit"
      >
        ⌘ + ⏎
      </button>
    </form>
  );
}

function Answer({
  question,
  setDisabled,
}: {
  question: string;
  setDisabled: (disabled: boolean) => void;
}) {
  const { data, error, isLoading } = useSWR(`/api/ask?q="${question}"`);

  useEffect(() => {
    setDisabled(!isLoading);
  }, [setDisabled, isLoading]);

  if (isLoading) return <div>Думаю над ответом...</div>;
  if (error || !data)
    return <div>Машина сломалась, перезагрузите страницу</div>;

  return <div>{data?.answer}</div>;
}

export default function Home() {
  const [disabled, setDisabled] = useState(false);
  const [question, askQuestion] = useState(
    "Расскажи рандомный факт о Екатеринбурге"
  );

  return (
    <Layout>
      <Question onAsk={askQuestion} canAsk={disabled} />
      <div className={styles.answer}>
        <Answer question={question} setDisabled={setDisabled} />
      </div>
    </Layout>
  );
}
