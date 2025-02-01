(function(wp) {
  var registerBlockType = wp.blocks.registerBlockType;
  var useBlockProps = wp.blockEditor.useBlockProps;
  var Button = wp.components.Button;
  var SelectControl = wp.components.SelectControl;
  var __ = wp.i18n.__;
  var createElement = wp.element.createElement;

  registerBlockType("custom/versus", {
    title: __("Versus Comparison", "custom-blocks"),
    category: "design",
    icon: "columns",
    attributes: {
      items: {
        type: "array",
        default: [
          {
            leftIcon: "fas fa-check",
            leftText: __("Feature A", "custom-blocks"),
            rightIcon: "fas fa-times",
            rightText: __("Feature B", "custom-blocks")
          }
        ]
      }
    },
    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var blockProps = useBlockProps();

      var fontAwesomeIcons = [
        "fas fa-check", "fas fa-times", "fas fa-star", "fas fa-heart", "fas fa-bolt",
        "fas fa-bell", "fas fa-camera", "fas fa-car", "fas fa-cloud", "fas fa-gift",
        "fas fa-globe", "fas fa-key", "fas fa-lightbulb", "fas fa-lock", "fas fa-map",
        "fas fa-music", "fas fa-pen", "fas fa-phone", "fas fa-play", "fas fa-power-off",
        "fas fa-print", "fas fa-save", "fas fa-search", "fas fa-shield-alt", "fas fa-shopping-cart",
        "fas fa-smile", "fas fa-snowflake", "fas fa-sun", "fas fa-truck", "fas fa-umbrella",
        "fas fa-user", "fas fa-users", "fas fa-video", "fas fa-volume-up", "fas fa-wallet",
        "fas fa-wrench", "fas fa-arrow-up", "fas fa-arrow-down", "fas fa-arrow-left", "fas fa-arrow-right",
        "fas fa-thumbs-up", "fas fa-thumbs-down", "fas fa-exclamation", "fas fa-info-circle", "fas fa-handshake",
        "fas fa-anchor", "fas fa-atom", "fas fa-battery-full", "fas fa-bicycle", "fas fa-binoculars",
        "fas fa-bomb", "fas fa-book", "fas fa-bug", "fas fa-burn", "fas fa-campground",
        "fas fa-chart-line", "fas fa-chess", "fas fa-code", "fas fa-coffee", "fas fa-compass",
        "fas fa-database", "fas fa-dice", "fas fa-door-open", "fas fa-dove", "fas fa-dragon",
        "fas fa-fan", "fas fa-fighter-jet", "fas fa-fire", "fas fa-flask", "fas fa-gavel",
        "fas fa-glasses", "fas fa-graduation-cap", "fas fa-hammer", "fas fa-hand-rock", "fas fa-hard-hat",
        "fas fa-hashtag", "fas fa-headphones", "fas fa-helicopter", "fas fa-highlighter", "fas fa-hourglass-end",
        "fas fa-ice-cream", "fas fa-id-card", "fas fa-infinity", "fas fa-jedi", "fas fa-keyboard",
        "fas fa-landmark", "fas fa-laptop-code", "fas fa-leaf", "fas fa-lightbulb", "fas fa-lock-open",
        "fas fa-magic", "fas fa-microchip", "fas fa-microscope", "fas fa-mountain", "fas fa-network-wired",
        "fas fa-oil-can", "fas fa-paint-brush", "fas fa-parachute-box", "fas fa-paw", "fas fa-pepper-hot",
        "fas fa-puzzle-piece", "fas fa-robot", "fas fa-rocket", "fas fa-skull-crossbones", "fas fa-space-shuttle",
        "fas fa-stethoscope", "fas fa-stopwatch", "fas fa-syringe", "fas fa-theater-masks", "fas fa-toilet-paper",
        "fas fa-toolbox", "fas fa-tools", "fas fa-trophy", "fas fa-umbrella-beach", "fas fa-university",
        "fas fa-user-secret", "fas fa-vial", "fas fa-walking", "fas fa-wine-glass", "fas fa-wrench",
        "fas fa-train", "fas fa-plane", "fas fa-ship", "fas fa-subway", "fas fa-truck-moving",
        "fas fa-truck-pickup", "fas fa-school", "fas fa-warehouse", "fas fa-water", "fas fa-wind",
        "fas fa-tree", "fas fa-seedling", "fas fa-moon", "fas fa-star-and-crescent", "fas fa-praying-hands",
        "fas fa-hiking", "fas fa-skating", "fas fa-skiing", "fas fa-swimming-pool", "fas fa-snowboarding"
      ];

      function updateComparison(index, key, value) {
        var newItems = attributes.items.slice();
        newItems[index][key] = value;
        setAttributes({ items: newItems });
      }

      function moveComparison(index, direction) {
        var newItems = attributes.items.slice();
        var swapIndex = index + direction;
        if (swapIndex >= 0 && swapIndex < newItems.length) {
          var temp = newItems[index];
          newItems[index] = newItems[swapIndex];
          newItems[swapIndex] = temp;
          setAttributes({ items: newItems });
        }
      }

      function removeComparison(index) {
        if (confirm(__("Are you sure you want to delete this row?", "custom-blocks"))) {
          var newItems = attributes.items.filter((_, i) => i !== index);
          setAttributes({ items: newItems });
        }
      }

      function addComparison() {
        var newItems = attributes.items.concat({
          leftIcon: "fas fa-check",
          leftText: __("Feature A", "custom-blocks"),
          rightIcon: "fas fa-times",
          rightText: __("Feature B", "custom-blocks")
        });
        setAttributes({ items: newItems });
      }

      function handleFocus(event, defaultValue) {
        if (event.target.value === defaultValue) {
          event.target.value = "";
        }
      }

      return createElement(
        "div",
        { className: "versus-editor" },
        createElement("h3", {}, __("Versus Component", "custom-blocks")),
        attributes.items.map(function(comp, index) {
          return createElement(
            "div",
            { className: "versus-row", key: index },
            createElement("div", { className: "icon-feature-group" },

              createElement(SelectControl, {
                value: comp.leftIcon,
                options: fontAwesomeIcons.map(icon => ({ label: icon, value: icon })),
                onChange: value => updateComparison(index, "leftIcon", value)
              })
            ),
            createElement("div", { className: "icon-feature-group" },

              createElement("textarea", {
                value: comp.leftText,
                onChange: event => updateComparison(index, "leftText", event.target.value),
                onFocus: event => handleFocus(event, __("Feature A", "custom-blocks")),
                className: "feature-textarea"
              })
            ),
            createElement("div", { className: "icon-feature-group" },

              createElement(SelectControl, {
                value: comp.rightIcon,
                options: fontAwesomeIcons.map(icon => ({ label: icon, value: icon })),
                onChange: value => updateComparison(index, "rightIcon", value)
              })
            ),
            createElement("div", { className: "icon-feature-group" },

              createElement("textarea", {
                value: comp.rightText,
                onChange: event => updateComparison(index, "rightText", event.target.value),
                onFocus: event => handleFocus(event, __("Feature B", "custom-blocks")),
                className: "feature-textarea"
              })
            ),
            createElement("div", { className: "action-buttons" },
              index > 0 && createElement(Button, { onClick: () => moveComparison(index, -1), variant: "secondary", className: "move-up-versus-item"}, __("▲", "custom-blocks")),
              index < attributes.items.length - 1 && createElement(Button, { onClick: () => moveComparison(index, 1),  variant: "secondary", className: "move-up-versus-item" }, __("▼", "custom-blocks")),
              createElement(Button, { onClick: () => removeComparison(index), variant: "destructive", className: "remove-versus-item" }, __("✖", "custom-blocks"))
            )
          );
        }),
        createElement(Button, { variant: "primary", className: "add-versus-item", onClick: addComparison }, __("Add Item", "custom-blocks"))
      );
    },
    save: function () {
      return null;
    }
  });
})(window.wp);
