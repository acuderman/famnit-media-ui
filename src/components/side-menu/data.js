
export const categories = [
    {
        category: 'Photoshop',
        to: '/photoshop',
        children: [
            {
                category: 'Working with layers',
                to: '/photoshop/working-with-layers',
                children: [],
            },
            {
                category: 'Change the image size',
                to: '/photoshop/image-size',
                children: [],
            },
        ],
    },
    {
        category: 'Gimp',
        to: '/gimp',
        children: [],
    }
]

export const adminCategories = [
    {
        category: 'Upload video',
        to: '/upload',
        children: [],
    },
    {
        category: 'Videos',
        to: '/videos',
        children: [],
    },
    {
        category: 'Categories',
        to: '/categories/add',
        children: [
            {
                category: 'Add Category',
                to: '/categories/add',
                children: [],
            },
            {
                category: 'Edit Category',
                to: '/categories/edit',
                children: [],
            },
            {
                category: 'Delete Category',
                to: '/categories/delete',
                children: [],
            },
        ],
    }
]