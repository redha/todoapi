const sanitizer = require('../helpers/sanitizer');

module.exports = {
    getCompleteValidTask: function ({
        id = null,    
        description,
        dueDate = null,
        createdOn = null,
        modifiedOn = null,
        done = 0,
        priority = 100}){
        

        // if provided Validate CreationDate
        if(id && !sanitizer.isPositiveInteger(id)){
            throw new TypeError(`id (${id}) is not a valid id`);
        }

        // if provided Validate CreationDate
        if(createdOn){
            if (!sanitizer.isValidDateTimeFormat(createdOn)){
                throw new TypeError (`Creation Date (${createdOn}) is not a in VALID date / time FORMAT`);
            }
            if (!sanitizer.isValidDateTime(createdOn)){
                throw new TypeError (`Creation Date (${createdOn}) is not a VALID date / time VALUE`);
            }
            createdOn = sanitizer.getValidDateTime(createdOn);
        }
        else{
            createdOn = new Date();
        }

        // Validate ModificationDate
        if(modifiedOn){
            if (!sanitizer.isValidDateTimeFormat(modifiedOn)){
                throw new TypeError (`Modification Date (${modifiedOn}) is not a in valid date/time format`);
            }
            if (!sanitizer.isValidDateTime(modifiedOn)){
                throw new TypeError (`Modification Date (${modifiedOn}) is not a valid date/time`);
            }
            modifiedOn = sanitizer.getValidDateTime(modifiedOn);
        }

        // Validate dueDate

        if(dueDate){
            if (!sanitizer.isValidDateTimeFormat(dueDate)){
                throw new TypeError (`Due Date (${dueDate}) is not a in valid date/time format`);
            }
            if (!sanitizer.isValidDateTime(dueDate)){
                throw new TypeError (`Due Date (${dueDate}) is not a valid date/time`);
            }
            dueDate = sanitizer.getValidDateTime(dueDate);
        }

        // Sanitize and Validate description
        description = sanitizer.getUsableText(description);
        if (description.length < 3){
            throw new Error (`Description (${description}) is not a valid description`);
        }

        if (!sanitizer.isProgressionValue(done)){
            throw new TypeError (`done: (${done}) must be valid (between 0 and 100)'`);
        }

        if (!sanitizer.isPositiveInteger(priority)){
            throw new TypeError (`priority (${priority}) must be a positive integer'`);
        }

        return { description, dueDate, createdOn, modifiedOn, done, priority }
    }
}