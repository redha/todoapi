const sanitizer =  {
    getFirstWord: function(str){
        return str.split(' ')[0];
    },
    usableLength: function(str){
        console.log(`*****usable length of ${str} is ${str.replace(/\s+/g, ' ').length}`);
        
        return str.replace(/\s+/g, ' ').length;
    },
    getUsableText: function(str){
        // delete any duplicate whitespace
        return str.replace(/\s+/, ' ');
    },
    isValidDateTimeFormat: function(datetimeStr){
        return /\d{4}[\-/]\d{2}[\-/]\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(datetimeStr);
    },
    isValidDateTime: function(datetimeStr){
        // The caller should test the format first ! Just in case 
        if (!this.isValidDateTimeFormat(datetimeStr)){
            return false;
        }
        else{
            return (new Date(datetimeStr) != 'Invalid Date');
        }
    },
    getValidDateTime: function(dateStr){
        if (this.isValidDateTime(dateStr)){
            return new Date(dateStr);
        }
        else{
            throw new TypeError(`(${dateStr}) is not a valid date or date time format. Please provide a valid value like 1999-12-31 23:59:59.000`)
        }
    },
    stringifyFilter: function(filterStr = []){
        //filter is an array of objects {fieldName, operator, value}
        throw new Error(`stringifyFilter Not implemented yet`);
    },
    capitalizeFirst: function(str){
        let str2 = str;
        if (str2.length > 0){
            str2[0] = str2[0].toUpperCase();
        }
        return str2;
    },
    isProgressionValue: function(value){
        return (!isNaN(value) && value >= 0 && value <= 100)
    },
    isPositiveInteger: function(value){
        return (!isNaN(value) && value > 0)
    },
    isInteger: function(value){
        return !/\D/.test(value);
    }
}

module.exports = sanitizer ;