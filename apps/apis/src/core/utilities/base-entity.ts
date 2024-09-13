export class BaseEntity<T> {
    constructor(partial: Partial<T>) {
        Object.assign(this, partial)
    }
}
