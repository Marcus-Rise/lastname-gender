import type { FC } from "react";
import { Card } from "../../components";
import type { ILastnameTransitionInfo } from "../lastname-info.interface";
import { useCallback, useMemo } from "react";
import type { ILastnameInfo } from "../lastname-info.interface";
import { Sex } from "../lastname-info.interface";
import styles from "./lastname-transition-results-card.module.scss";

const LastnameInfoTransitionResultsCard: FC<{
  items: ILastnameTransitionInfo[];
}> = (props) => {
  const isSingleResult = useMemo(() => props.items.length === 1, [props.items.length]);
  const title = useMemo(() => (!isSingleResult ? "Результаты" : "Результат"), [isSingleResult]);

  const LastnameInfoRow: FC<{
    info: ILastnameInfo;
  }> = useCallback((props) => {
    let sex: string;

    switch (props.info.sex) {
      case Sex.Female:
        sex = "женский";
        break;
      case Sex.Male:
        sex = "мужской";
        break;
      default:
        sex = "неизвестен";
        break;
    }

    return (
      <td>
        <b>{props.info.value}</b>, {sex}
      </td>
    );
  }, []);

  return (
    <Card>
      <h2 className={styles.title}>{title}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            {!isSingleResult && <th>#</th>}
            <th>Было</th>
            <th>Стало</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((i, index) => (
            <tr key={i.before.value}>
              {!isSingleResult && <td>{index + 1}.</td>}
              <LastnameInfoRow info={i.before} />
              {i.before !== i.after ? <LastnameInfoRow info={i.after} /> : <td>не склоняется</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export { LastnameInfoTransitionResultsCard };
