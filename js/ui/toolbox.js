"use strict";

$(function() {
  var t = App.locale.translate;

  var $selector = $("#tab-selector");
  var $selected = null;
  var tabs = [];
  var tabNames = [];

  /**
   * @param {string[]} enabledTabs
   */
  function init(enabledTabs) {
    tabNames = enabledTabs;

    var options = [];

    _.each(tabNames, (tabName, tabIndex) => {
      var n = tabIndex + 1;
      var text = t(`toolbox.${tabName}`);

      options.push(`<option value="${tabIndex}">[${n}] ${text}</option>`);
    });

    $selector.html(options);

    _.each(tabNames, (tabName) => {
      tabs.push($("#" + tabName));
    });

    $selected = tabs[+$selector.find(":selected").val()];
    $selected.show();

    $selector.on("change", function() {
      setTab(+$selector.find(":selected").val());
    });
  }

  /**
   * @param {number} tabIndex
   */
  function setTab(tabIndex) {
    tabIndex = +tabIndex;
    var $newTab = tabs[tabIndex];

    if ($newTab) {
      if ($newTab != $selected) {
        $selected.hide();
        $selected = $newTab;
        $selected.show();

        $selector.val(tabIndex);
      }
    }
  }

  App.toolbox = {
    "setTab": setTab,
    "init": init
  };
});