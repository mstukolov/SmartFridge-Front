/* eslint-disable flowtype/require-valid-file-annotation */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Chip from "material-ui/Chip";
import { connect } from "react-redux";
import { deleteFridges } from "../../AC";

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2
  },
  row: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  }
});
class ChipsPanel extends React.Component {
  styles = {
    chip: {
      margin: 4
    },
    wrapper: {
      display: "flex",
      flexWrap: "wrap"
    }
  };

  handleRequestDelete = data => () => {
    // if (data.label === "ReactJS") {
    //   alert("Why would you want to delete React?! :)"); // eslint-disable-line no-alert
    //   return;
    // }
    //
    // const chipData = [...this.props.selected];
    // const chipToDelete = chipData.indexOf(data);
    // chipData.splice(chipToDelete, 1);
    // this.setState({ chipData });
  };

  render() {
    const { classes, selected } = this.props;

    return (
      <div className={classes.row}>
        {selected.map(data => {
          return (
            <Chip
              label={data.model}
              key={data.id}
              onRequestDelete={this.handleRequestDelete(data)}
              className={classes.chip}
            />
          );
        })}
      </div>
    );
  }
}

ChipsPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  state => {
    return {
      selected: state.fridges.selected.toArray()
    };
  },
  {
    deleteFridges
  }
)(withStyles(styles)(ChipsPanel));
