(function (wp) {
  var registerBlockType = wp.blocks.registerBlockType;
  var useBlockProps = wp.blockEditor.useBlockProps;
  var Button = wp.components.Button;
  var TextControl = wp.components.TextControl;
  var __ = wp.i18n.__;
  var createElement = wp.element.createElement;

  registerBlockType("custom/accordion", {
    title: __("FAQ accordion", "custom-blocks"),
    description: __("A collapsible accordion block with ordered sub-items.", "custom-blocks"),
    category: "design",
    icon: "menu-alt3",
    attributes: {
      items: {
        type: "array",
        default: [{ title: __("New Accordion Item"), content: __("New content") }],
      },
    },
    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var blockProps = useBlockProps();

      var updateItem = function (index, key, value) {
        var newItems = attributes.items.map((item, i) => {
          if (i === index) {
            return { ...item, [key]: value };
          }
          return item;
        });
        setAttributes({ items: newItems });
      };

      var clearDefaultText = function (index, key, defaultValue) {
        return function (event) {
          if (event.target.value === defaultValue) {
            updateItem(index, key, "");
          }
        };
      };

      var removeItem = function (index) {
        if (window.confirm(__("Are you sure you want to delete this item?", "custom-blocks"))) {
          var newItems = attributes.items.filter((_, i) => i !== index);
          setAttributes({ items: newItems });
        }
      };

      var moveItemUp = function (index) {
        if (index > 0) {
          let newItems = [...attributes.items];
          [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
          setAttributes({ items: newItems });
        }
      };

      var moveItemDown = function (index) {
        if (index < attributes.items.length - 1) {
          let newItems = [...attributes.items];
          [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
          setAttributes({ items: newItems });
        }
      };

      var addItem = function () {
        var newItems = [...attributes.items, { title: __("New Accordion Item", "custom-blocks"), content: __("New content", "custom-blocks") }];
        setAttributes({ items: newItems });
      };

      return createElement(
        "div",
        Object.assign({}, blockProps, { className: "custom-accordion-editor" }),
        createElement("h3", {}, __("FAQ accordion", "custom-blocks")),
        attributes.items.map((item, index) =>
          createElement(
            "div",
            { className: "accordion-item", key: index },

            createElement(TextControl, {
              value: item.title,
              onChange: (newTitle) => updateItem(index, "title", newTitle),
              onFocus: clearDefaultText(index, "title", __("New Accordion Item", "custom-blocks")),
              placeholder: __("Enter accordion title...", "custom-blocks"),
            }),

            createElement("textarea", {
              className: "accordion-content-editor",
              value: item.content,
              onChange: (event) => updateItem(index, "content", event.target.value),
              onFocus: clearDefaultText(index, "content", __("New content","custom-blocks")),
              placeholder: __("Enter accordion content...", "custom-blocks"),
              rows: 3,
            }),

            createElement(
              "div",
              { className: "accordion-controls" },
              index > 0 &&
              createElement(
                Button,
                {
                  variant: "secondary",
                  className: "move-up-accordion-item",
                  onClick: () => moveItemUp(index),
                },
                __("▲", "custom-blocks")
              ),

              index < attributes.items.length - 1 &&
              createElement(
                Button,
                {
                  variant: "secondary",
                  className: "move-down-accordion-item",
                  onClick: () => moveItemDown(index),
                },
                __("▼", "custom-blocks")
              ),

              createElement(
                Button,
                {
                  variant: "destructive",
                  className: "remove-accordion-item",
                  onClick: () => removeItem(index),
                },
                __("✖", "custom-blocks")
              )
            )
          )
        ),

        createElement(
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
