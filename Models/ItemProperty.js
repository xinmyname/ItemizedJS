export default class ItemProperty {

    constructor(propertyReference) {
        this.optional = propertyReference.endsWith("?");
        this.name = this.optional
            ? propertyReference.substring(0, propertyReference.length-1)
            : propertyReference;
    }
}