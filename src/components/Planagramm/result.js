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

const styles = theme => ({
  root: {
    width: "100%",
    // marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData("Количество слотов по SKU", 159, 6.0, 24, 4.0),
  createData("Отсутствующие SKU", 237, 9.0, 37, 4.3),
  createData("Пустые ячейки", 262, 16.0, 24, 6.0)
];

function BasicTable(props) {
  const { classes } = props;

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
                <TableCell>{n.name}</TableCell>
                <TableCell numeric>{n.calories}</TableCell>
                <TableCell numeric>{n.fat}</TableCell>
                <TableCell numeric>{n.carbs}</TableCell>
                <TableCell numeric>{n.protein}</TableCell>
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
