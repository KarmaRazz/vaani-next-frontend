"use client";
export default function NotesTable({ rows, subjectName, onEdit, onDelete }) {
  return (
    <div className="card p-0 mt-6 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr className="text-left">
            <th className="px-4 py-3 w-8"><input type="checkbox" disabled /></th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Subject</th>
            <th className="px-4 py-3">Goals</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-t">
              <td className="px-4 py-3"><input type="checkbox" /></td>
              <td className="px-4 py-3">{r.title}</td>
              <td className="px-4 py-3 capitalize">{r.type}</td>
              <td className="px-4 py-3">{subjectName(r.subjectId)}</td>
              <td className="px-4 py-3">{(r.goalSlugs||[]).join(", ").toUpperCase()}</td>
              <td className="px-4 py-3">{(r.price||0)>0?`₹${r.price}`:'Free'}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex rounded-full px-2 py-0.5 ${r.isPublished?'bg-green-100 text-green-700':'bg-yellow-100 text-yellow-700'}`}>
                  {r.isPublished ? 'Published' : 'Draft'}
                </span>
              </td>
              <td className="px-4 py-3">
                <button className="text-vaani-accent mr-3 hover:underline" onClick={()=>onEdit(r)}>Edit</button>
                <button className="text-red-600 hover:underline" onClick={()=>onDelete(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {rows.length===0 && (
            <tr><td className="px-4 py-10 text-center text-gray-600" colSpan={8}>No items</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
