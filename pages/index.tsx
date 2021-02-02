import type { FC } from "react";
import { useCallback, useState } from "react";
import { Card, Container } from "../src/components";
import styles from "./home.module.scss";
import type { ILastnameTransitionInfo } from "../src/lastname";
import { LastNameForm, LastnameInfoTransitionResultsCard, LastnameTransit } from "../src/lastname";
import Head from "next/head";

const Home: FC = () => {
  const [lastNameInfoArray, setLastNameInfoArray] = useState<Array<ILastnameTransitionInfo> | null>(null);

  const onSubmit = useCallback(async (data: string | File) => {
    console.debug(data);

    if (typeof data === "string" && data) {
      setLastNameInfoArray([LastnameTransit(data)]);
    } else if (typeof data !== "string" && data) {
      const formData = new FormData();
      formData.append("file", data);

      const res = await fetch("/api/lastname-transit", {
        method: "POST",
        body: formData,
      });

      const transitions = await res.json();

      setLastNameInfoArray(transitions);
    } else {
      setLastNameInfoArray(null);
    }
  }, []);

  const title = "Твоя фамилия";

  return (
    <>
      <Head>
        <title key={"title"}>{title}</title>
        <meta key={"meta-title"} name={"title"} content={title} />
        <meta key={"description"} name={"description"} content={"Склонение фамилии по полу"} />
      </Head>
      <Container center fullHeight>
        <div className={styles.root}>
          <Card>
            <h2 className={styles.title}>Твоя фамилия</h2>

            <LastNameForm onSubmit={onSubmit} />
          </Card>

          {lastNameInfoArray && <LastnameInfoTransitionResultsCard items={lastNameInfoArray} />}
        </div>
      </Container>
    </>
  );
};

export default Home;
