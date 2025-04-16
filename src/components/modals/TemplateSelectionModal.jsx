// src/components/modals/TemplateSelectionModal.jsx
import React from 'react';
import { UserCircle, Trophy, Users, BookOpen } from 'lucide-react';

const TemplateSelectionModal = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate, 
  hasExistingData = false 
}) => {
  // モーダルが開いていない場合は何も表示しない
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-5 max-w-2xl w-full shadow-xl">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {hasExistingData 
              ? "ポートフォリオの編集スタイルを選択" 
              : "目的に合ったテンプレートを選択"}
          </h3>
        </div>
        
        {/* 既存データがある場合の説明 */}
        {hasExistingData && (
          <div className="bg-blue-50 p-3 rounded-lg mb-4 border border-blue-200">
            <p className="text-blue-800 text-sm">
              既存のポートフォリオデータがあります。テンプレートに沿って編集するか、
              <button 
                className="text-blue-600 underline ml-1"
                onClick={onClose}
              >
                通常の編集画面に戻る
              </button>
              こともできます。
            </p>
          </div>
        )}
        
        {/* 説明テキスト */}
        <p className="text-gray-600 mb-6">
          あなたの目標に合ったテンプレートを選ぶと、ポートフォリオの作成がスムーズになります。
          大学サッカー部の志望先にもマッチした情報を入力できます。
        </p>
        
        {/* テンプレート選択オプション */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* プロ志向テンプレート */}
          <div 
            className="border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md hover:border-green-500"
            onClick={() => onSelectTemplate('pro')}
          >
            <div className="bg-green-100 text-green-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
              <Trophy size={24} />
            </div>
            <h4 className="font-bold text-center text-gray-800 mb-2">プロ志向</h4>
            <p className="text-sm text-gray-600 text-center">
              Jリーグを目指し、高いレベルでプレーしたい選手向け
            </p>
          </div>
          
          {/* 指導者志向テンプレート */}
          <div 
            className="border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md hover:border-green-500"
            onClick={() => onSelectTemplate('coach')}
          >
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
              <Users size={24} />
            </div>
            <h4 className="font-bold text-center text-gray-800 mb-2">指導者志向</h4>
            <p className="text-sm text-gray-600 text-center">
              将来コーチや教員を目指す選手向け
            </p>
          </div>
          
          {/* 文武両道型テンプレート */}
          <div 
            className="border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md hover:border-green-500"
            onClick={() => onSelectTemplate('balance')}
          >
            <div className="bg-purple-100 text-purple-600 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
              <BookOpen size={24} />
            </div>
            <h4 className="font-bold text-center text-gray-800 mb-2">文武両道型</h4>
            <p className="text-sm text-gray-600 text-center">
              学業とサッカーの両立を目指す選手向け
            </p>
          </div>
        </div>
        
        {/* フッター注釈 */}
        <p className="text-sm text-gray-500 italic">
          ※テンプレートはいつでも変更できます。最も近いものを選んでください。
        </p>
      </div>
    </div>
  );
};

export default TemplateSelectionModal;