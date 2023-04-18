import React, { useState } from 'react';

const DynamicForm = () => {
    const [formFields, setFormFields] = useState([]);

    const handleAddField = () => {
        setFormFields([...formFields, { name: '', type: 'string', nestedFields: [] }]);
    };

    const handleDeleteField = (index) => {
        setFormFields([...formFields.slice(0, index), ...formFields.slice(index + 1)]);
    };

    const handleUpdateFieldName = (index, name) => {
        setFormFields([...formFields.slice(0, index), { ...formFields[index], name }, ...formFields.slice(index + 1)]);
    };

    const handleUpdateFieldType = (index, type) => {
        setFormFields([...formFields.slice(0, index), { ...formFields[index], type }, ...formFields.slice(index + 1)]);
    };

    const handleAddNestedField = (index) => {
        setFormFields([
            ...formFields.slice(0, index),
            { ...formFields[index], type: 'object', nestedFields: [...formFields[index].nestedFields, { name: '', type: 'string' }] },
            ...formFields.slice(index + 1),
        ]);
    };

    const handleDeleteNestedField = (parentIndex, childIndex) => {
        setFormFields([
            ...formFields.slice(0, parentIndex),
            { ...formFields[parentIndex], nestedFields: [...formFields[parentIndex].nestedFields.slice(0, childIndex), ...formFields[parentIndex].nestedFields.slice(childIndex + 1)] },
            ...formFields.slice(parentIndex + 1),
        ]);
    };

    const handleUpdateNestedFieldName = (parentIndex, childIndex, name) => {
        setFormFields([
            ...formFields.slice(0, parentIndex),
            {
                ...formFields[parentIndex],
                nestedFields: [...formFields[parentIndex].nestedFields.slice(0, childIndex), { ...formFields[parentIndex].nestedFields[childIndex], name }, ...formFields[parentIndex].nestedFields.slice(childIndex + 1)],
            },
            ...formFields.slice(parentIndex + 1),
        ]);
    };

    const handleUpdateNestedFieldType = (parentIndex, childIndex, type) => {
        setFormFields([
            ...formFields.slice(0, parentIndex),
            {
                ...formFields[parentIndex],
                nestedFields: [...formFields[parentIndex].nestedFields.slice(0, childIndex), { ...formFields[parentIndex].nestedFields[childIndex], type }, ...formFields[parentIndex].nestedFields.slice(childIndex + 1)],
            },
            ...formFields.slice(parentIndex + 1),
        ]);
    };

    const handleSave = () => {
        console.log(formFields);
    };

    return (
        <div className='flex justify-center items-center flex-col text-gray-900 bg-gray-200 p-2 w-4/6 rounded-md'>
            <div>
            <button onClick={handleAddField} className='flex px-2 py-1 rounded-full bg-violet-300 text-violet-900 font-bold border-2 border-violet-600'>Add Field</button>
            {formFields.map((field, index) => (
                <div key={index} className='py-1'>
                <span className='px-2 my-1 rounded-full bg-gray-700 text-gray-100'>{index+1}</span>
                    <input className='mx-1 bg-gray-300 px-2 py-1 text-gray-700 rounded-full bg-slate-50 border-1 border-gray-900 outline-none font-medium w-80' type="text" value={field.name} onChange={(e) => handleUpdateFieldName(index, e.target.value)} />
                    <select className='mx-1 px-2 py-1 rounded-full bg-gray-700 text-gray-100 border-2 border-slate-500' value={field.type} onChange={(e) => handleUpdateFieldType(index, e.target.value)}>
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                        <option value="object">Object</option>
                    </select>
                    {field.type === 'object' && (
                        <div className='px-4'>
                            <button className='px-2 py-1 my-1 rounded-full bg-violet-300 text-violet-900 font-bold border-2 border-violet-600'  onClick={() => handleAddNestedField(index)}>Add Nested Field</button>
                            {field.nestedFields.map((nestedField, nestedIndex) => (
                                <div key={nestedIndex} className='px-8 py-1 flex'>
                                    <div className='px-2 my-1 rounded-full bg-gray-700 text-gray-100'>{nestedIndex+1}</div>
                                    <input className='mx-1 bg-gray-300 px-2 py-1 text-gray-700 rounded-full bg-slate-50 border-1 border-gray-900 outline-none font-medium w-64' type="text" value={nestedField.name} onChange={(e) => handleUpdateNestedFieldName(index, nestedIndex, e.target.value)} />
                                    <select className='mx-1 px-2 py-1 rounded-full bg-gray-700 text-gray-100 border-2 border-slate-500' value={nestedField.type} onChange={(e) => handleUpdateNestedFieldType(index, nestedIndex, e.target.value)}>
                                        <option value="string">String</option>
                                        <option value="number">Number</option>
                                        <option value="boolean">Boolean</option>
                                    </select>
                                    <button className='mx-2 px-2 py-1 rounded-full bg-red-300 text-red-900 font-bold border-2 border-rose-600' onClick={() => handleDeleteNestedField(index, nestedIndex)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    )}
                    <button className='mx-3 px-2 py-1 rounded-full bg-red-300 text-red-900 font-bold border-2 border-rose-600' onClick={() => handleDeleteField(index)}>Delete</button>
                </div>
            ))}
            <button className='px-2 py-1 rounded-full bg-emerald-200 text-emerald-900 font-bold border-2 border-emerald-600' onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default DynamicForm;

