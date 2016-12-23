<% for (idx in fields) {
    if (fields[idx].fieldIsEnum) { _%>
const enum <%= fields[idx].fieldType %> {<%
        const enums = fields[idx].fieldValues.split(',');
        for (var i = 0; i < enums.length; i++) { %>
    '<%= enums[i] %>'<%if (i < enums.length - 1) { %>,<% } } _%>

};
<%_ } } _%>
<%_ if (dto == "no") {%>
<%- include('model-class-import-template.ejs'); -%>
<%_ }
var variables = [];
var tsKeyType;
if (pkType == 'String') {
    tsKeyType = 'string';
} else {
    tsKeyType = 'number';
}
variables.push('id?: ' + tsKeyType);
for (idx in fields) {
    var fieldType = fields[idx].fieldType;
<<<<<<< entity-ng2
    var fieldName = fields[idx].fieldName;
    var tsType;
    if (fields[idx].fieldIsEnum) {
        tsType = fieldType;
    } else if (fieldType == 'ZonedDateTime') {
        tsType = 'Date';
    } else if (fieldType == 'Boolean') {
        tsType = 'boolean';
    } else if (fieldType == 'Double' || fieldType == 'Float' || fieldType == 'Long' || fieldType == 'Integer' || fieldType == 'BigDecimal') {
        tsType = 'number';
    } else if (fieldType == 'String'  || fieldType == 'UUID') {
        tsType = 'string';
    } else { //(fieldType === 'byte[]' || fieldType === 'ByteBuffer') && fieldTypeBlobContent == 'any' || (fieldType === 'byte[]' || fieldType === 'ByteBuffer') && fieldTypeBlobContent == 'image' || fieldType == 'LocalDate'
        tsType = 'any';
    }
    variables.push(fieldName + '?: ' + tsType);
}
for (idx in relationships) {
    var fieldType;
    var fieldName;
    if (dto == "no") {
        fieldType = relationships[idx].otherEntityNameCapitalized;
        fieldName = relationships[idx].relationshipFieldName;
    } else {
        fieldType = tsKeyType;
        fieldName = relationships[idx].relationshipFieldName + "Id";
    }
    variables.push(fieldName + '?: ' + fieldType);
}_%>
export class <%= entityClass %> {
    constructor(<% for (idx in variables) { %>
        public <%- variables[idx] %>,<% } %>
=======
    var fieldTypeBlobContent = fields[idx].fieldTypeBlobContent; _%>
        public <%= fieldName %>?:<%_ if (fields[idx].fieldIsEnum) { _%>
 <%= fieldType %>,
    <%_ } else if ((fieldType === 'byte[]' || fieldType === 'ByteBuffer') && fieldTypeBlobContent == 'image') { _%>
 any,
    <%_ } else if (fieldType == 'ZonedDateTime') { _%>
 any,
    <%_ } else if (fieldType == 'LocalDate') { _%>
 any,
    <%_ } else if (fieldType == 'Boolean') { _%>
 Boolean,
    <%_ } else if (fieldType == 'Double' || fieldType == 'Float' || fieldType == 'Long' || fieldType == 'Integer' || fieldType == 'BigDecimal') { _%>
 number,
    <%_ } else if (fieldType == 'String'  || fieldType == 'UUID') { _%>
 string,
    <%_ } else if ((fieldType === 'byte[]' || fieldType === 'ByteBuffer') && fieldTypeBlobContent == 'any') { _%>
 any,
    <%_ } else { _%>
 any,
    <%_ } _%>
<%_ } _%>
>>>>>>> ZonedDateTime semi working, left detail part
    ) { }
}
