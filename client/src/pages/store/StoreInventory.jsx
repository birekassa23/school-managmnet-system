import { useState } from 'react';

const mockInventoryItems = [
  { id: 1, itemCode: 'INV-1001', name: 'Grade 10 Mathematics Textbooks', category: 'Textbooks', qty: 150, unit: 'Copies', unitPrice: 450, status: 'In Stock' },
  { id: 2, itemCode: 'INV-1002', name: 'Grade 10 Physics Workbooks', category: 'Textbooks', qty: 120, unit: 'Copies', unitPrice: 380, status: 'In Stock' },
  { id: 3, itemCode: 'INV-1003', name: 'Science Lab Microscope Set', category: 'Lab Equipment', qty: 15, unit: 'Units', unitPrice: 8500, status: 'Low Stock' },
  { id: 4, itemCode: 'INV-1004', name: 'Ergonomic Student Desk & Chair', category: 'Furniture', qty: 300, unit: 'Sets', unitPrice: 3200, status: 'In Stock' },
  { id: 5, itemCode: 'INV-1005', name: 'Academy Sports Footballs & Nets', category: 'Sports Gear', qty: 8, unit: 'Pcs', unitPrice: 1200, status: 'Reorder Needed' },
  { id: 6, itemCode: 'INV-1006', name: 'Whiteboard Marker Boxes (12pcs)', category: 'Stationery', qty: 45, unit: 'Boxes', unitPrice: 250, status: 'In Stock' },
];

export default function StoreInventory() {
  const [inventory, setInventory] = useState(mockInventoryItems);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: 'Textbooks', qty: '', unit: 'Copies', unitPrice: '' });
  const [statusMsg, setStatusMsg] = useState('');

  const filteredItems = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.itemCode.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.qty) return;

    const qtyNum = Number(newItem.qty) || 0;
    const itemCode = `INV-${1000 + inventory.length + 1}`;
    const status = qtyNum > 20 ? 'In Stock' : qtyNum > 5 ? 'Low Stock' : 'Reorder Needed';

    const created = {
      id: inventory.length + 1,
      itemCode,
      name: newItem.name,
      category: newItem.category,
      qty: qtyNum,
      unit: newItem.unit,
      unitPrice: Number(newItem.unitPrice) || 0,
      status,
    };

    setInventory([created, ...inventory]);
    setShowAddModal(false);
    setNewItem({ name: '', category: 'Textbooks', qty: '', unit: 'Copies', unitPrice: '' });
    setStatusMsg(`Successfully added ${created.name} to store inventory!`);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-widest text-amber-400">
            Academy Store & Inventory Hub
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Store Stock & Asset Management 📦
          </h1>
          <p className="text-slate-300 text-sm">
            Track learning materials, textbooks, lab equipment, furniture stock, and reorder levels.
          </p>
        </div>
      </header>

      {statusMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-sm font-semibold border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
          <i className="fas fa-check-circle text-lg" /> {statusMsg}
        </div>
      )}

      {/* Control Bar: Filter, Search, and Add Stock */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
              <i className="fas fa-search text-slate-400 mr-2.5 text-xs" />
              <input
                type="text"
                placeholder="Search item name or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-sm outline-none bg-transparent"
              />
            </div>
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none font-bold"
          >
            <option value="All">All Categories</option>
            <option value="Textbooks">Textbooks</option>
            <option value="Lab Equipment">Lab Equipment</option>
            <option value="Furniture">Furniture</option>
            <option value="Sports Gear">Sports Gear</option>
            <option value="Stationery">Stationery</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <i className="fas fa-plus" /> Add New Inventory Stock
        </button>
      </div>

      {/* Inventory Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
          <i className="fas fa-boxes text-amber-500" /> Current Stock Register ({filteredItems.length} Items)
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 dark:bg-slate-950 text-white text-xs tracking-wider font-semibold">
              <tr>
                <th className="p-4">Item Code</th>
                <th className="p-4">Item Name</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Quantity</th>
                <th className="p-4 text-right">Unit Value (ETB)</th>
                <th className="p-4 text-right">Total Asset Value</th>
                <th className="p-4 text-center">Stock Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/50">
                  <td className="p-4 font-mono text-xs text-amber-600 dark:text-amber-400 font-bold">{item.itemCode}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{item.name}</td>
                  <td className="p-4 font-medium text-slate-500">{item.category}</td>
                  <td className="p-4 font-extrabold text-right">{item.qty} {item.unit}</td>
                  <td className="p-4 font-mono text-right">{item.unitPrice.toLocaleString()} ETB</td>
                  <td className="p-4 font-mono font-extrabold text-right text-emerald-600 dark:text-emerald-400">
                    {(item.qty * item.unitPrice).toLocaleString()} ETB
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full font-extrabold text-xs ${
                        item.status === 'In Stock'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                          : item.status === 'Low Stock'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          : 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Add New Store Item</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg"
              >
                <i className="fas fa-times" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Item Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grade 11 Chemistry Books"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Textbooks">Textbooks</option>
                    <option value="Lab Equipment">Lab Equipment</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Sports Gear">Sports Gear</option>
                    <option value="Stationery">Stationery</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Unit Type</label>
                  <select
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Copies">Copies</option>
                    <option value="Units">Units</option>
                    <option value="Sets">Sets</option>
                    <option value="Boxes">Boxes</option>
                    <option value="Pcs">Pcs</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Quantity</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 100"
                    value={newItem.qty}
                    onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Unit Price (ETB)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 500"
                    value={newItem.unitPrice}
                    onChange={(e) => setNewItem({ ...newItem, unitPrice: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md"
                >
                  Save Stock Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
