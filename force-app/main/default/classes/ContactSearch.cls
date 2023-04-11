public class ContactSearch {
    public static List<Contact> searchForContacts(string par1,string par2){
        List<Contact> caList=[select Id,Name from Contact where LastName=:par1 and MailingPostalCode=:par2];
        
        return caList;
    }
}