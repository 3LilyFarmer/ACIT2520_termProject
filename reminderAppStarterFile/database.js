let Database = {
    cindy: {
        id: 1,
        reminders: [{id: 1, title: "cindy", description: "abcabc", completed: false},
                    {id: 2, title: "fgh", description: "hghkjsa", completed: false}]
    },
    alex: {
        id: 2,
        reminders: [{id: 1, title: "alex", description: "abcabc", completed: false},
                    {id: 2, title: "fgh", description: "hghkjsa", completed: false}]
    } 
}

// let Database = {
//     { id: 1,
//     name: cindy,
//     reminders: [{ id: 1, title: "cindy", description: "abcabc", completed: false },
//         { id: 2, title: "fgh", description: "hghkjsa", completed: false }]
//     }
//     { id: 2,
//     name: alex,
//     reminders: [{ id: 1, title: "alex", description: "abcabc", completed: false },
//         { id: 2, title: "fgh", description: "hghkjsa", completed: false }]
//     }
// }

module.exports = Database;