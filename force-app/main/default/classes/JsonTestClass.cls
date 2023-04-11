public  class JsonTestClass {
    String queryType;
	String queryResultType;
	String asOf;
	List<FieldObj> columns;
	List<WorkItemObj> workItems;

	public Class FieldObj{
		String referenceName;
		String name;
		String url;
	}

	public Class WorkItemObj{
		String id;
		String url;
	}
}