const db = require("./db");

const getAllGroups = (callback) => {

    const sql = `
        SELECT *
        FROM user_groups
        ORDER BY group_id DESC
    `;

    db.query(sql, callback);

};


const checkGroupExists = (groupName, callback) => {

    const sql = "SELECT * FROM user_groups WHERE group_name = ?";

    db.query(sql, [groupName], callback);

};

const addGroup = (groupData, callback) => {

    const sql = `
        INSERT INTO user_groups
        (group_name, chain_id, is_active)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            groupData.group_name,
            groupData.chain_id,
            groupData.is_active
        ],
        callback
    );

};

const getGroupById = (id, callback) => {

    const sql = "SELECT * FROM user_groups WHERE group_id = ?";

    db.query(sql, [id], callback);

};

const updateGroup = (id, groupData, callback) => {

    const sql = `
        UPDATE user_groups
        SET group_name = ?, chain_id = ?, is_active = ?
        WHERE group_id = ?
    `;

    db.query(
        sql,
        [
            groupData.group_name,
            groupData.chain_id,
            groupData.is_active,
            id
        ],
        callback
    );

};


const checkChainId = (id, callback) => {

    const sql = "SELECT chain_id FROM user_groups WHERE group_id = ?";

    db.query(sql, [id], callback);

};

const softDeleteGroup = (id, callback) => {

    const sql = `
        UPDATE user_groups
        SET is_active = 0
        WHERE group_id = ?
    `;

    db.query(sql, [id], callback);

};
const getDashboardCounts = (callback) => {

    const sql = `
        SELECT
            COUNT(*) AS totalGroups,
            SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS activeGroups,
            SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) AS inactiveGroups
        FROM user_groups
    `;

    db.query(sql, callback);

};

const getRecentGroups = (callback) => {

    const sql = `
        SELECT group_name, chain_id, is_active
        FROM user_groups
        ORDER BY group_id DESC
        LIMIT 5
    `;

    db.query(sql, callback);

};


module.exports = {

    getAllGroups,

    checkGroupExists,

    addGroup,

    getGroupById,

    updateGroup,

    checkChainId,

    softDeleteGroup,
     getDashboardCounts,

     getRecentGroups

};