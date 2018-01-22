import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import ReportProblemIcon from "material-ui-icons/ReportProblem";
import CheckCircleIcon from "material-ui-icons/CheckCircle";
import green from "material-ui/colors/green";
import red from "material-ui/colors/red";

const styles = theme => ({
  root: {
    width: "100%",
    // marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },

  done: {
    color: green[500]
  },
  report: {
    color: red[500]
  }
});

let id = 0;
function createData(index, product, plan, fact, status) {
  id += 1;
  return { id, index, product, plan, fact, status };
}

function BasicTable(props) {
  const { classes } = props;

  const data = [
    createData(
      "Количество слотов по SKU",
      [
        <div key={"1"}>SKU_1</div>,
        <div key={"2"}>SKU_2</div>,
        <div key={"3"}>SKU_3</div>
      ],
      [
        <div key={"4"}>20</div>,
        <div key={"5"}>10</div>,
        <div key={"6"}>8</div>
      ],
      [
        <div key={"7"}>20</div>,
        <div key={"8"}>10</div>,
        <div key={"9"}>6</div>
      ],
      <CheckCircleIcon className={classes.done} />
    ),
    createData(
      "Отсутствующие SKU",
      [
        <div key={"1"}>SKU_1</div>,
        <div key={"2"}>SKU_2</div>,
        <div key={"3"}>SKU_3</div>
      ],
      [
        <div key={"4"}>20</div>,
        <div key={"5"}>10</div>,
        <div key={"6"}>8</div>
      ],
      [
        <div key={"7"}>20</div>,
        <div key={"8"}>10</div>,
        <div key={"9"}>6</div>
      ],
      <ReportProblemIcon className={classes.report} />
    ),
    createData("Пустые ячейки", null, 0, 5, null)
  ];
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Показатель</TableCell>
            <TableCell numeric>Товар</TableCell>
            <TableCell numeric>План (шт)</TableCell>
            <TableCell numeric>Факт (шт)</TableCell>
            <TableCell numeric>Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell>{n.index}</TableCell>
                <TableCell numeric>{n.product}</TableCell>
                <TableCell numeric>{n.plan}</TableCell>
                <TableCell numeric>{n.fact}</TableCell>
                <TableCell numeric>{n.status}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

BasicTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BasicTable);
