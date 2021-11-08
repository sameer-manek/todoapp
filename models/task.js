const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TaskSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},

		creator_id: {
			type: ObjectId,
			required: true,
		},

		description: {
			type: String,
			required: false,
		},

		due_date: {
			type: Date,
			required: true,
		},

		assigned_to: {
			type: ObjectId,
			required: true,
		},

		parent_id: {
			type: ObjectId,
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('tasks', TaskSchema);
