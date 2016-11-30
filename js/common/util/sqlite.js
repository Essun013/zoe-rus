/**
 * Created by ianchen on 2016/11/25.
 */

const SQLite = require('react-native-sqlite-storage');
SQLite.enablePromise(true);
var generator = require('./generator');
var app = require('./app');

const sqlQueue = {
    queue: {},
    push() {
        var uid = generator.ranUUID();
        this.queue[uid] = uid;

        return uid;
    },
    pop(uid) {
        var length = this.queueLength(this.queue);

        if (length > 0 && this.queue.hasOwnProperty(uid))
            delete this.queue[uid];
    },
    queueLength() {
        var i = 0;
        for (var k in this.queue) i++;
        return i;
    }
};

const sqliteFactory = {
    db: null,
    openDB() {
        return SQLite.openDatabase({name: app.sqlDbName}).then((DB) => this.db = DB);
    },
    exec(sql, v) {
        var that = this;
        if (!!sql && sql.constructor === String)
            return that.openDB().then(() => {
                var uid = sqlQueue.push();
                return that.db.executeSql(sql, v).then((r) => {
                    sqlQueue.pop(uid);
                    return r[0].rows.raw();
                }).catch((e) => {
                    sqlQueue.pop(uid);
                    throw e;
                })
            });
        else
            return Promise.reject().then(() => {
                throw error({message: '非法sql语句！'});
            });
    },
    execTx(sql, v) {
        var that = this;
        if (!!sql && sql.constructor === String)
            return this.openDB().then(() => {
                var uid = sqlQueue.push();
                return that.db.transaction((tx) => {
                    return tx.executeSql(sql, v).then(([tx, r]) => {
                        tx.finish();
                        sqlQueue.pop(uid);
                        return r.rows.raw();
                    })
                }).catch((e) => {
                    sqlQueue.pop(uid);
                    throw e;
                })
            });
        else
            return Promise.reject().then(() => {
                throw error({message: '非法sql语句！'});
            });
    },
    closeDB() {
        this.db.close();
        this.db = null;
    }
};

function closeSqlite() {
    if (sqlite._autoClose && sqliteQueue.queueLength() === 0)
        sqlite.closeDB();

    sqlite.autoClose(true);
}

const sqlite = {
    _autoClose: true,
    tableExist(tbName) {
        return sqliteFactory.exec('select name from sqlite_master where name = ?', [tbName]).then((r) => {
            closeSqlite();
            return !!r && r.constructor === Array && r.length > 0;
        }).catch((e) => {
            closeSqlite();
            throw e;
        });
    },
    query(sql, v) {
        return sqliteFactory.exec(sql, v).then((r) => {
            closeSqlite();
            return r;
        }).catch((e) => {
            closeSqlite();
            throw e;
        });
    },
    findOne(sql, v) {
        return this.query(sql, v).then((r) => {
            closeSqlite()
            return !!r && r.constructor === Array && r.length > 0 ? r[0] : null;
        }).catch((e) => {
            closeSqlite();
            throw e;
        });
    },
    save(sql, v) {
        return sqliteFactory.execTx(sql, v).then((r) => {
            closeSqlite()
            return r;
        }).catch((e) => {
            closeSqlite();
            throw e;
        });
    },
    autoClose(close) {
        this._autoClose = close;
        return this;
    },
    closeDB() {
        sqliteFactory.closeDB();
        this.autoClose(true);
    },
};

module.exports = sqlite;