export default class User {
    username;
    warehouseId;
    idToken;
    refreshToken;
    roles;

    constructor(username, warehouseId, idToken, refreshToken, roles) {
        this.username = username;
        this.warehouseId = warehouseId;
        this.idToken = idToken;
        this.refreshToken = refreshToken;
        this.roles = roles;
    }
}

