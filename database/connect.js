var con = require('./config').mysql_pool;

con.getConnection((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
})
con.on('error', function (err) {
    console.log('caught this error: ' + err.toString());
});
function handleDisconnect(conn) {
    conn.on('error', function (err) {
        if (!err.fatal) {
            return;
        }
        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            throw err;
        }

        console.log('Re-connecting lost connection: ' + err.stack);

        connection = mysql.createPool(conn.config);
        handleDisconnect(connection);
        connection.getConnection();
    });
}
handleDisconnect(con);

module.exports = con;