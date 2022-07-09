"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(db) {
    db.subkategori.belongsTo(db.kategori, { foreignKey: "fk_kategori" });
    db.kategori.hasMany(db.subkategori, { foreignKey: "fk_kategori" });
    db.jawab.belongsTo(db.divisi, { foreignKey: "fk_divisi" });
    db.tanya.hasMany(db.jawab, { foreignKey: "fk_tanya" });
    db.mkategori.belongsTo(db.kategori, { foreignKey: "k1", as: "key1" });
    db.mkategori.belongsTo(db.kategori, { foreignKey: "k2", as: "key2" });
    db.msub.belongsTo(db.subkategori, { foreignKey: "sub1", as: "key1" });
    db.msub.belongsTo(db.subkategori, { foreignKey: "sub2", as: "key2" });
    db.mdiv.belongsTo(db.divisi, { foreignKey: "d1", as: "key1" });
    db.mdiv.belongsTo(db.divisi, { foreignKey: "d2", as: "key2" });
    db.mdiv.belongsTo(db.subkategori, { foreignKey: "sub", as: "subs" });
    return db;
}
exports.default = default_1;
