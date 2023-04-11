global class FetchStorySchedule implements Schedulable {
    global void execute(SchedulableContext sc) {
        VSTSService vs = new VSTSService();
        vs.doPost();
    }
}