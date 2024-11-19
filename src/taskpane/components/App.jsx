import * as React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import TextInsertion from "./TextInsertion";
import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { insertText } from "../taskpane";
import TextExtractor from "./TextExtractor";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = (props) => {
  const { title } = props;
  const styles = useStyles();
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.

  return (
    <div className={styles.root}>
      <Header logo="assets/gummy.png" title={title} message="Buenos días" />
      <TextInsertion insertText={insertText} />
      <TextExtractor />

    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
