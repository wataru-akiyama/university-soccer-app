// src/components/MultiSelectDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

/**
 * 複数選択可能なドロップダウンコンポーネント
 * 
 * @param {Object} props
 * @param {string} props.label - ドロップダウンのラベルテキスト
 * @param {React.ReactNode} props.icon - 表示するアイコン
 * @param {Array} props.options - 選択肢の配列
 * @param {Array} props.selectedValues - 現在選択されている値の配列
 * @param {function} props.onChange - 選択変更時のコールバック関数
 * @returns {JSX.Element}
 */
const MultiSelectDropdown = ({ 
  label, 
  icon, 
  options, 
  selectedValues, 
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 外部クリックを検知して閉じる
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ドロップダウンの開閉
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // チェックボックスの切り替え処理
  const handleCheckboxChange = (option) => {
    // 現在の選択状態を確認
    const isSelected = selectedValues.includes(option);
    let newSelectedValues;
    
    if (isSelected) {
      // 選択済みなら削除
      newSelectedValues = selectedValues.filter(value => value !== option);
    } else {
      // 未選択なら追加
      newSelectedValues = [...selectedValues, option];
    }
    
    // 親コンポーネントの状態を更新
    onChange(newSelectedValues);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ドロップダウントリガー */}
      <button
        type="button"
        className="w-full p-3 border rounded-md flex justify-between items-center bg-white"
        onClick={toggleDropdown}
      >
        <span className="flex items-center text-gray-700">
          {icon && <span className="mr-2">{icon}</span>}
          {label} {selectedValues.length > 0 && `(${selectedValues.length})`}
        </span>
        {isOpen ? 
          <ChevronUp className="text-gray-400" size={16} /> : 
          <ChevronDown className="text-gray-400" size={16} />
        }
      </button>
      
      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div className="absolute z-30 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2">
            {options.map((option, index) => (
              <div key={index} className="p-2 hover:bg-gray-100 rounded-md">
                <label className="flex items-center w-full cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4"
                    checked={selectedValues.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  <span className="flex-grow">{option}</span>
                  {selectedValues.includes(option) && (
                    <Check size={16} className="text-green-600" />
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;