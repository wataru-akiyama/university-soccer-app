// src/components/PremiumPlanModal.jsx - プレミアムプランモーダル
import React, { useState, useEffect } from 'react';
import { X, Check, Crown, Zap, BarChart3, Eye, MessageSquare, Star, ArrowRight } from 'lucide-react';

const PremiumPlanModal = ({ 
  isOpen, 
  onClose, 
  onUpgrade,
  currentPlan = 'free' 
}) => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);

  // モーダル表示時に背面のスクロールを無効化
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      await onUpgrade(selectedPlan);
      onClose();
    } catch (error) {
      console.error('アップグレードエラー:', error);
      alert('アップグレードに失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const plans = {
    monthly: {
      id: 'monthly',
      name: '月額プラン',
      price: 980,
      period: '月',
      description: '毎月更新、いつでもキャンセル可能',
      popular: false
    },
    annual: {
      id: 'annual',
      name: '年額プラン',
      price: 7800,
      originalPrice: 11760,
      period: '年',
      description: '2ヶ月分お得！',
      popular: true,
      savings: '33%OFF'
    }
  };

  const features = [
    {
      category: '検索・表示機能',
      icon: Eye,
      items: [
        { name: '全ての検索結果表示', free: '20件まで', premium: '無制限' },
        { name: '高度なソート機能', free: '基本のみ', premium: '全機能' },
        { name: 'フィルター機能', free: '基本', premium: '詳細フィルター' }
      ]
    },
    {
      category: '大学詳細情報',
      icon: MessageSquare,
      items: [
        { name: 'PLAYMAKERコメント', free: '一部のみ', premium: '全文表示' },
        { name: '詳細な費用情報', free: '概算のみ', premium: '詳細内訳' },
        { name: '入部条件詳細', free: '基本情報', premium: '詳細条件' },
        { name: '口コミ・評判', free: '非表示', premium: '全て表示' }
      ]
    },
    {
      category: '比較・分析機能',
      icon: BarChart3,
      items: [
        { name: '大学比較機能', free: '利用不可', premium: '最大3校比較' },
        { name: '詳細データ比較', free: '利用不可', premium: '全項目比較' },
        { name: '比較レポート出力', free: '利用不可', premium: '利用可能' }
      ]
    },
    {
      category: 'サポート・特典',
      icon: Star,
      items: [
        { name: 'メールサポート', free: '基本対応', premium: '優先対応' },
        { name: '新機能早期アクセス', free: 'なし', premium: 'あり' },
        { name: '広告表示', free: 'あり', premium: 'なし' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="sticky top-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Crown size={28} className="mr-3" />
              <div>
                <h2 className="text-2xl font-bold">プレミアムプランにアップグレード</h2>
                <p className="text-yellow-100 text-sm mt-1">
                  すべての機能を使って、理想の大学を見つけよう
                </p>
              </div>
            </div>
            <button 
              className="text-white hover:text-yellow-200 transition-colors p-2" 
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* プラン選択 */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-4">プランを選択</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {Object.values(plans).map((plan) => (
                <div 
                  key={plan.id}
                  className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedPlan === plan.id 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        おすすめ
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center mb-2">
                    <input
                      type="radio"
                      name="plan"
                      checked={selectedPlan === plan.id}
                      onChange={() => setSelectedPlan(plan.id)}
                      className="mr-3"
                    />
                    <h4 className="text-lg font-semibold">{plan.name}</h4>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {plan.originalPrice && (
                        <span className="text-gray-400 line-through text-lg">
                          ¥{plan.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-3xl font-bold text-orange-600">
                        ¥{plan.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">/{plan.period}</p>
                    
                    {plan.savings && (
                      <div className="mt-2">
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                          {plan.savings}
                        </span>
                      </div>
                    )}
                    
                    <p className="text-gray-500 text-sm mt-2">{plan.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 機能比較表 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-center mb-6">機能比較</h3>
            <div className="space-y-6">
              {features.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <div key={categoryIndex}>
                    <div className="flex items-center mb-4">
                      <Icon size={20} className="text-orange-500 mr-2" />
                      <h4 className="text-lg font-semibold">{category.category}</h4>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 font-medium">機能</th>
                            <th className="text-center py-2 font-medium">フリープラン</th>
                            <th className="text-center py-2 font-medium">
                              <div className="flex items-center justify-center">
                                <Crown size={16} className="text-orange-500 mr-1" />
                                プレミアム
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.items.map((item, itemIndex) => (
                            <tr key={itemIndex} className="border-b">
                              <td className="py-3 font-medium">{item.name}</td>
                              <td className="py-3 text-center text-gray-600">
                                {item.free}
                              </td>
                              <td className="py-3 text-center">
                                <div className="flex items-center justify-center">
                                  <Check size={16} className="text-green-500 mr-1" />
                                  <span className="text-green-600 font-medium">
                                    {item.premium}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* アップグレードボタン */}
          <div className="text-center space-y-4">
            <button
              className={`w-full sm:w-auto bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleUpgrade}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  処理中...
                </>
              ) : (
                <>
                  <Zap size={20} className="mr-2" />
                  プレミアムにアップグレード
                  <ArrowRight size={20} className="ml-2" />
                </>
              )}
            </button>
            
            <p className="text-gray-500 text-sm">
              * 安全な決済システムを使用しています<br/>
              * いつでもキャンセル可能です
            </p>
          </div>

          {/* 特典・保証 */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold mb-4 text-center">プレミアム会員特典</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Check size={20} className="text-green-600" />
                </div>
                <p className="font-medium">30日間返金保証</p>
                <p className="text-gray-600">満足いただけない場合、全額返金</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap size={20} className="text-blue-600" />
                </div>
                <p className="font-medium">即座にアップグレード</p>
                <p className="text-gray-600">決済完了後すぐに利用開始</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star size={20} className="text-purple-600" />
                </div>
                <p className="font-medium">優先サポート</p>
                <p className="text-gray-600">専用サポートチームが対応</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlanModal;