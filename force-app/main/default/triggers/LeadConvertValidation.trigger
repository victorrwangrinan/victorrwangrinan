trigger LeadConvertValidation on Lead (before update,before insert, after insert) {
    
    if(trigger.isUpdate){
        for(Lead l:trigger.new){
            if(l.LastName.containsIgnoreCase('DoNotConvert')){
                l.addError('Lead is not eligible for conversion');
            }
        }
    }else if(trigger.isInsert){
        
        if(trigger.isAfter){
            Set<Id> leadIds = new Set<Id>();
            System.debug('1.Number of Queries used in this apex code so far: ' + Limits.getQueries());
            System.debug('===>'+JSON.serialize(Datacloud.FindDuplicates.findDuplicates(Trigger.new)));
            Integer kk = 0;
            for(Integer i = 0;i<110;i++){
                if(Datacloud.FindDuplicates.findDuplicates(Trigger.new).size()>0){
                     kk++;
                }
            }
            System.debug(kk+'3.Number of Queries used in this apex code so far: ' + Limits.getQueries());
        }else if(trigger.isBefore){
            
            // if(Datacloud.FindDuplicates.findDuplicates(Trigger.new).size()>0){
            //     Trigger.new.addError('there is duplicate record');
            // }
        }

    }
}