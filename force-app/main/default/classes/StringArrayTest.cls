public class StringArrayTest {
    public static List<string> generateStringArray(Integer num){
        List<string> strList=new List<string>();
        for(Integer i=0;i<num;i++){
            string s='Test '+i;
			strList.add(s);
        }
        return strList;
    }
}