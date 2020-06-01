import React from "react";
import Title from "./Title";
import { ScrollView } from "react-native";
import PropTypes from "prop-types";

const HorizontalSlider = ({ title, children }) => (
  <>
    <Title title={title} />
    <ScrollView
      style={{ marginTop: 20, marginBottom: 40 }}
      contentContainerStyle={{ paddingLeft: 30 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  </>
);

HorizontalSlider.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default HorizontalSlider;