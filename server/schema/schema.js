const graphql = require('graphql');
const GraphQLDate = require('graphql-date');
const GraphQLEmail = require('graphql-type-email');
const Group = require('../models/group');
const Question = require('../models/question');
const Choice = require('../models/choice');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;




const GroupType = new GraphQLObjectType({
    name: 'Group',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        group: {
            type: GraphQLInt
        },
        desc: {
            type: GraphQLString
        },
        questions: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                return Question.find({ groupid: parent.id });
            }
        },
        createdAt: {
            type: GraphQLDate
        },
        updatedAt: {
            type: GraphQLDate
        }
    })
});

const ApplicantType = new GraphQLObjectType({
    name: 'Applicant',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        batch: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        dob: {
            type: GraphQLDate
        },
        education: {
            type: GraphQLString
        },
        gender: {
            type: GraphQLString
        },
        religion: {
            type: GraphQLString
        },
        email: {
            type: GraphQLEmail
        },
        createdAt: {
            type: GraphQLDate
        },
        updatedAt: {
            type: GraphQLDate
        }
    })
});
const BatchType = new GraphQLObjectType({
    name: 'Batch',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        batch: {
            type: GraphQLInt
        },
        batchDate: {
            type: GraphQLDate
        },
        createdAt: {
            type: GraphQLDate
        },
        updatedAt: {
            type: GraphQLDate
        }
    })
});
const DeptType = new GraphQLObjectType({
    name: 'Dept',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        dept: {
            type: GraphQLString
        },
        createdAt: {
            type: GraphQLDate
        },
        updatedAt: {
            type: GraphQLDate
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        deptId: {
            type: GraphQLID
        },
        sectId: {
            type: GraphQLID
        },
        password: {
            type: GraphQLString
        },
        roleId: {
            type: GraphQLID
        },
        createdAt: {
            type: GraphQLDate
        },
        updatedAt: {
            type: GraphQLDate
        }
    })
});
const VacantType = new GraphQLObjectType({
    name: 'Vacant',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        batchId: {
            type: GraphQLID
        },
        deptId: {
            type: GraphQLID
        },
        sectId: {
            type: GraphQLID
        },
        persons: {
            type: GraphQLID
        },

        createdAt: {
            type: GraphQLDate
        },
        updatedAt: {
            type: GraphQLDate
        }
    })
});
const SectType = new GraphQLObjectType({
    name: 'Sect',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        sect: {
            type: GraphQLString
        },
        createdAt: {
            type: GraphQLDate
        },
        updatedAt: {
            type: GraphQLDate
        }
    })
});

const ChoiceType = new GraphQLObjectType({
    name: 'Choice',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        choice_1: {
            type: GraphQLString
        },
        choice_2: {
            type: GraphQLString
        },
        choice_3: {
            type: GraphQLString
        },
        choice_4: {
            type: GraphQLString
        },
        choice_5: {
            type: GraphQLString
        },
        question: {
            type: QuestionType,
            resolve(parent, args) {
                return Question.findById(parent.questionid);
            }
        },
        createdAt: {
            type: GraphQLDate
        },
        updatedAt: {
            type: GraphQLDate
        }
    })
});
const QuestionType = new GraphQLObjectType({
    name: 'Question',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        group: {
            type: GroupType,
            resolve(parent, args) {
                return Group.findById(parent.groupid);
            }
        },
        question: {
            type: GraphQLString
        },
        answer: {
            type: GraphQLString
        },
        choice: {
            type: new GraphQLList(ChoiceType),
            resolve(parent, args) {
                return Choice.find({ questionid: parent.id });
            }
        },
        createdAt: {
            type: GraphQLDate
        },
        updatedAt: {
            type: GraphQLDate
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        choice: {
            type: ChoiceType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Choice.findById(args.id);
            }
        },
        applicant: {
            type: ApplicantType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Applicant.findById(args.id);
            }
        },
        batch: {
            type: BatchType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Batch.findById(args.id);
            }
        },
        dept: {
            type: DeptType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Dept.findById(args.id);
            }
        },
        sect: {
            type: SectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Sect.findById(args.id);
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return user.findById(args.id);
            }
        },
        vacant: {
            type: VacantType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return vacant.findById(args.id);
            }
        },
        question: {
            type: QuestionType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Question.findById(args.id);
            }
        },
        groups: {
            type: new GraphQLList(GroupType),
            resolve(parent, args) {
                return Group.find({});
            }
        },
        batchs: {
            type: new GraphQLList(BatchType),
            resolve(parent, args) {
                return Batch.find({});
            }
        },
        depts: {
            type: new GraphQLList(DeptType),
            resolve(parent, args) {
                return Dept.find({});
            }
        },
        sects: {
            type: new GraphQLList(SectType),
            resolve(parent, args) {
                return Sect.find({});
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        },
        vacants: {
            type: new GraphQLList(VacantType),
            resolve(parent, args) {
                return vacant.find({});
            }
        },
        choices: {
            type: new GraphQLList(ChoiceType),
            resolve(parent, args) {
                return Choice.find({});
            }
        },
        questions: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                return Question.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addGroup: {
            type: GroupType,
            args: {
                group: { type: GraphQLInt },
                desc: { type: GraphQLString },
                createdAt: { type: GraphQLDate },
                updatedAt: { type: GraphQLDate }
            },
            resolve(parent, args) {
                let group = new Group({
                    group: args.group,
                    desc: args.desc,
                    createdAt: args.createdAt,
                    updatedAt: args.updatedAt
                });
                return group.save();
            }
        },
        addbatch: {
            type: BatchType,
            args: {
                batch: { type: GraphQLInt },
                batchDate: { type: GraphQLDate },
                createdAt: { type: GraphQLDate },
                updatedAt: { type: GraphQLDate }
            },
            resolve(parent, args) {
                let batch = new Batch({
                    batch: args.batch,
                    batchDate: args.batchDate,
                    createdAt: args.createdAt,
                    updatedAt: args.updatedAt
                });
                return batch.save();
            }
        },

        adddept: {
            type: DeptType,
            args: {
                dept: { type: GraphQLString },
                createdAt: { type: GraphQLDate },
                updatedAt: { type: GraphQLDate }
            },
            resolve(parent, args) {
                let dept = new Dept({
                    dept: args.dept,
                    createdAt: args.createdAt,
                    updatedAt: args.updatedAt
                });
                return dept.save();
            }
        },
        addsect: {
            type: SectType,
            args: {
                sect: { type: GraphQLString },
                createdAt: { type: GraphQLDate },
                updatedAt: { type: GraphQLDate }
            },
            resolve(parent, args) {
                let sect = new Sect({
                    sect: args.sect,
                    createdAt: args.createdAt,
                    updatedAt: args.updatedAt
                });
                return sect.save();
            }
        },
        adduser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                deptId: { type: GraphQLID },
                sectId: { type: GraphQLID },
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                roleId: { type: GraphQLID },
                createdAt: { type: GraphQLDate },
                updatedAt: { type: GraphQLDate }
            },
            resolve(parent, args) {
                let user = new User({
                    user: args.user,
                    name: args.name,
                    deptId: args.deptId,
                    sectId: args.sectId,
                    username: args.username,
                    password: args.password,
                    roleId: args.roleId,
                    createdAt: args.createdAt,
                    updatedAt: args.updatedAt
                });
                return user.save();
            }
        },
        addvacant: {
            type: VacantType,
            args: {
                batchId: { type: GraphQLID },
                deptId: { type: GraphQLID },
                sectId: { type: GraphQLID },
                persons: { type: GraphQLInt },
                createdAt: { type: GraphQLDate },
                updatedAt: { type: GraphQLDate }
            },
            resolve(parent, args) {
                let vacant = new Vacant({
                    batchId: args.batchId,
                    deptId: args.deptId,
                    sectId: args.sectId,
                    persons: args.persons,
                    createdAt: args.createdAt,
                    updatedAt: args.updatedAt
                });
                return user.save();
            }
        },
        addQuestion: {
            type: QuestionType,
            args: {
                groupid: { type: GraphQLString },
                question: { type: GraphQLString },
                answer: { type: GraphQLString },
                createdAt: { type: GraphQLDate },
                updatedAt: { type: GraphQLDate }
            },
            resolve(parent, args) {
                let question = new Question({
                    groupid: args.groupid,
                    question: args.question,
                    answer: args.answer,
                    createdAt: args.createdAt,
                    updatedAt: args.updatedAt
                });
                return question.save();
            }
        },
        addChoice: {
            type: ChoiceType,
            args: {
                choice_1: { type: GraphQLString },
                choice_2: { type: GraphQLString },
                choice_3: { type: GraphQLString },
                choice_4: { type: GraphQLString },
                choice_5: { type: GraphQLString },
                questionid: { type: GraphQLID },
                createdAt: { type: GraphQLDate },
                updatedAt: { type: GraphQLDate }
            },
            resolve(parent, args) {
                let choice = new Choice({
                    choice_1: args.choice_1,
                    choice_2: args.choice_2,
                    choice_3: args.choice_3,
                    choice_4: args.choice_4,
                    choice_5: args.choice_5,
                    questionid: args.questionid,
                    createdAt: args.createdAt,
                    updatedAt: args.updatedAt
                });
                return choice.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
