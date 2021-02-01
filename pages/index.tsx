import type { FC } from "react";
import { useCallback, useState } from "react";
import { Card, Container, LastNameForm } from "../src/components";
import styles from "./home.module.scss";
import type { ILastnameTransitionInfo } from "../src/lastname-info";
import { LastnameInfoTransitionResultsCard, TransitLastname } from "../src/lastname-info";

const Home: FC = () => {
  const [lastNameInfoArray, setLastNameInfoArray] = useState<Array<ILastnameTransitionInfo> | null>(null);

  const onSubmit = useCallback((data: string | File) => {
    console.debug(data);

    if (typeof data === "string" && data) {
      setLastNameInfoArray([TransitLastname(data)]);
    } else {
      setLastNameInfoArray(null);
    }
  }, []);

  return (
    <Container center fullHeight>
      <div className={styles.root}>
        <Card>
          <h2 className={styles.title}>Твоя фамилия</h2>

          <LastNameForm onSubmit={onSubmit} />
        </Card>

        {lastNameInfoArray && <LastnameInfoTransitionResultsCard items={lastNameInfoArray} />}
      </div>
    </Container>
  );
};

export default Home;
