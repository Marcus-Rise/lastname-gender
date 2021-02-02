import type { FC } from "react";
import { Card } from "../../components";
import type { ILastnameTransitionInfo } from "../lastname-info.interface";
import { useCallback, useMemo, useState } from "react";
import type { ILastnameInfo } from "../lastname-info.interface";
import { Sex } from "../lastname-info.interface";
import styles from "./lastname-transition-results-card.module.scss";
import ReactPaginate from "react-paginate";

const LastnameInfoTransitionResultsCard: FC<{
  items: ILastnameTransitionInfo[];
}> = (props) => {
  const RESULTS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0);

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
      <td className={styles.column}>
        <b>{props.info.value}</b>, {sex}
      </td>
    );
  }, []);

  const filteredArrayItems = useMemo(() => {
    const start = currentPage * RESULTS_PER_PAGE;

    return props.items.slice(start, start + RESULTS_PER_PAGE);
  }, [currentPage, props.items, RESULTS_PER_PAGE]);

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
          {filteredArrayItems.map((i, index) => (
            <tr key={index}>
              {!isSingleResult && <td className={styles.column}>{index + 1}.</td>}
              <LastnameInfoRow info={i.before} />
              {i.before !== i.after ? (
                <LastnameInfoRow info={i.after} />
              ) : (
                <td className={styles.column}>не склоняется</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {!isSingleResult && (
        <ReactPaginate
          containerClassName={styles.paginationContainer}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(props.items.length / RESULTS_PER_PAGE)}
          onPageChange={(selectedItem) => setCurrentPage(selectedItem.selected)}
          forcePage={currentPage}
          pageLinkClassName={styles.paginationLink}
          activeClassName={styles.paginationLinkActive}
        />
      )}
    </Card>
  );
};

export { LastnameInfoTransitionResultsCard };
