public class ContactAndLeadSearch {
    public static List<List<Sobject>> searchContactsAndLeads(string str){
        List<List<Sobject>> seachList=[Find :str  IN ALL FIELDS RETURNING contact(LastName),Lead(LastName)];
        return seachList;
    }
}