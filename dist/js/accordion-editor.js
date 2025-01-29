(function (wp) {
  var registerBlockType = wp.blocks.registerBlockType;
  var useBlockProps = wp.blockEditor.useBlockProps;
  var Button = wp.components.Button;
  var TextControl = wp.components.TextControl;
  var __ = wp.i18n.__;

  registerBlockType("custom/accordion", {
    title: __("Accordion", "custom-blocks"),
    description: __("A collapsible accordion block with ordered sub-items.", "custom-blocks"),
    category: "design",
    icon: "menu-alt3",
    attributes: {
      items: {
        type: "array",
        default: [{ title: "New Accordion Item", content: "New content" }],
      },
    },
    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var blockProps = useBlockProps();

      // Function to update an item
      var updateItem = function (index, key, value) {
        var newItems = attributes.items.map((item, i) => {
          if (i === index) {
            return { ...item, [key]: value };
          }
          return item;
        });
        setAttributes({ items: newItems });
      };

      // Function to clear default text on focus
      var clearDefaultText = function (index, key, defaultValue) {
        return function (event) {
          if (event.target.value === defaultValue) {
            updateItem(index, key, "");
          }
        };
      };

      // Function to show a confirmation prompt before deleting
      var removeItem = function (index) {
        if (window.confirm(__("Are you sure you want to delete this item?", "custom-blocks"))) {
          var newItems = attributes.items.filter((_, i) => i !== index);
          setAttributes({ items: newItems });
        }
      };

      // Function to move an item up
      var moveItemUp = function (index) {
        if (index > 0) {
          let newItems = [...attributes.items];
          [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
          setAttributes({ items: newItems });
        }
      };

      // Function to move an item down
      var moveItemDown = function (index) {
        if (index < attributes.items.length - 1) {
          let newItems = [...attributes.items];
          [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
          setAttributes({ items: newItems });
        }
      };

      // Function to add a new item
      var addItem = function () {
        var newItems = [...attributes.items, { title: "New Accordion Item", content: "New content" }];
        setAttributes({ items: newItems });
      };

      return wp.element.createElement(
        "div",
        Object.assign({}, blockProps, { className: "custom-accordion-editor" }),
        attributes.items.map((item, index) =>
          wp.element.createElement(
            "div",
            { className: "accordion-item", key: index },

            // Editable Accordion Title
            wp.element.createElement(TextControl, {
              label: __("Title", "custom-blocks"),
              value: item.title,
              onChange: (newTitle) => updateItem(index, "title", newTitle),
              onFocus: clearDefaultText(index, "title", "New Accordion Item"),
              placeholder: __("Enter accordion title...", "custom-blocks"),
            }),

            // Editable Accordion Content (Textarea)
            wp.element.createElement("textarea", {
              className: "accordion-content-editor",
              value: item.content,
              onChange: (event) => updateItem(index, "content", event.target.value),
              onFocus: clearDefaultText(index, "content", "New content"),
              placeholder: __("Enter accordion content...", "custom-blocks"),
              rows: 3,
            }),

            // Buttons in One Line
            wp.element.createElement(
              "div",
              { className: "accordion-controls" },
              index > 0 &&
              wp.element.createElement(
                Button,
                {
                  variant: "secondary",
                  className: "move-up-accordion-item",
                  onClick: () => moveItemUp(index),
                },
                __("▲", "custom-blocks") // Unicode for Up Arrow
              ),

              index < attributes.items.length - 1 &&
              wp.element.createElement(
                Button,
                {
                  variant: "secondary",
                  className: "move-down-accordion-item",
                  onClick: () => moveItemDown(index),
                },
                __("▼", "custom-blocks") // Unicode for Down Arrow
              ),

              wp.element.createElement(
                Button,
                {
                  variant: "destructive",
                  className: "remove-accordion-item",
                  onClick: () => removeItem(index),
                },
                __("✖", "custom-blocks") // Unicode for Cross
              )
            )
          )
        ),

        // Add Button
        wp.element.createElement(
          Button,
          {
            variant: "primary",
            className: "add-accordion-item",
            onClick: addItem,
          },
          __("Add Item", "custom-blocks")
        )
      );
    },
    save: function () {
      return null;
    },
  });
})(window.wp);
