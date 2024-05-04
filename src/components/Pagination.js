// Pagination.js
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../themeProvider/ThemeProvider";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
 

  const renderPageNumbers = () => {
    const visiblePages = 5;
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));

    for (let i = 0; i < visiblePages; i++) {
      if (startPage + i <= totalPages) {
        pages.push(
          <TouchableOpacity
            key={startPage + i}
            style={[
              theme.pageNumber,
              {
                backgroundColor:
                  startPage + i === currentPage
                    ? theme.primaryColor
                    : theme.secondaryColor,
              },
            ]}
            onPress={() => onPageChange(startPage + i)}
          >
            <Text
              style={{
                color:
                  startPage + i === currentPage
                    ? theme.secondaryColor
                    : theme.primaryColor,
              }}
            >
              {startPage + i}
            </Text>
          </TouchableOpacity>
        );
      }
    }

    return pages;
  };

  const handleArrowClick = (direction) => {
    const newPage =
      direction === "left"
        ? Math.max(1, currentPage - 1)
        : Math.min(totalPages, currentPage + 1);
    onPageChange(newPage);
  };

  return (
    totalPages > 1 && (
      <View style={theme.paginationContainer}>
        <TouchableOpacity onPress={() => handleArrowClick("left")}>
          <Ionicons
            name="chevron-back-circle"
            size={theme.iconPrimarySize}
            style={
              currentPage === 1
                ? theme.iconDisabledColor
                : theme.iconPrimaryColor
            }
          />
        </TouchableOpacity>

        {renderPageNumbers()}

        <TouchableOpacity onPress={() => handleArrowClick("right")}>
          <Ionicons
            name="chevron-forward-circle"
            size={theme.iconPrimarySize}
            style={
              currentPage === totalPages
                ? theme.iconDisabledColor
                : theme.iconPrimaryColor
            }
          />
        </TouchableOpacity>
      </View>
    )
  );
};

export default Pagination;
