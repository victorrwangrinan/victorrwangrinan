trigger AccountTrigger on Account(after insert,after update) {
    new Triggers()
        .bind(Triggers.Evt.afterupdate, new AccountHandler())
        .manage();
}