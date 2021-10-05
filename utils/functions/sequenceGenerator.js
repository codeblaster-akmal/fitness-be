'use strict';

const db = require("../../config/db");

const codeGenerator = (numberofDigit, prefix, startValue, startFrom) => {
    const zeroPad = (num, places) => String(num).padStart(places, startFrom);
    return `${prefix}${zeroPad(startValue, numberofDigit)}`;
}

exports.sequenceGenerator = async name => {
    const { numberofDigit, prefix, startValue, startFrom, id } = await db.sequences.findOne({ where: { name } });
    const uniqueId = codeGenerator(numberofDigit, prefix, startValue, startFrom);
    return { uniqueId, startValue, seqId: id }
}

exports.updateSequence = async (id, value) => {
    await db.sequences.update(value, { where: { id } });
}