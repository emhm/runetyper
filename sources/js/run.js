
/* global App, Updater, Env, findOne, removeNode */

App.run = function () {
    console.log("@run");

    App.KBoardProvider.container = findOne("#kboard-space");
    App.WritingProcessor.textArea = findOne("#output");
    App.MenuProvider.alphSelectLi = findOne(".selector-alphabet");
    App.MenuProvider.xCharsSelectLi = findOne(".selector-xchars");
    App.MenuProvider.layoutSelectLi = findOne(".selector-layout");
    App.MenuProvider.subtitlesSwitchLi = findOne(".switch-subtitles");

    App.Constructor.buildLayouts();
    App.Constructor.buildAlphabets();
    App.EventAssigner.initializeWritingOutput();
    App.EventAssigner.initializeKeyCommands();
    App.EventAssigner.initializeClickControls();
    App.EventAssigner.initializeKBoards();

    Updater.register("_update", App.Storage);
    Updater.register("alphabet", App.KBoardProvider);
    Updater.register("alphabet", App.Literator);
    Updater.register("layout", App.Literator);
    Updater.register("view", App.UrlHandler);
    Updater.confirmTopic("subtitles");
    for (var t in Updater.topics) {
        Updater.registerDomReceivers(Updater.topics[t].name);
    }

    var nonZeroDefaults = {"subtitles": "trans"};
    for (var t in Updater.topics) {
        var topicName = Updater.topics[t].name;
        if (App.Storage.passesTopic(topicName)) {
            Updater.push(
                    topicName,
                    App.Storage.get(topicName) || nonZeroDefaults[topicName] || 0
            );
        }
    }
    Updater.push("view", App.UrlHandler.requestedView);
    App.fillEmail();

    if (Env.browser === "ms") {
        App.Ms.runOverride();
    }

    if (Env.ok) {
        removeNode(findOne("#loader"));
    }

    App.cleanUp();
};
