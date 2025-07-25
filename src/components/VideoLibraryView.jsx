// src/components/VideoLibraryView.jsx - 動画ライブラリページ（修正版）
import React, { useState } from 'react';
import { Play, Clock, Lock, Crown, ChevronLeft, Search, Filter } from 'lucide-react';
import MaskedContent from './MaskedContent';
import PremiumBadge from './PremiumBadge';

const VideoLibraryView = ({ 
  onBack, 
  isPremium = false,
  onUpgradeToPremium
}) => {
  const [selectedSection, setSelectedSection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // モックアップ用の動画データ（修正版）
  const videoSections = [
    {
      id: 'basics',
      title: '進路選択の基本',
      description: '大学サッカー部選びの基礎知識',
      videos: [
        {
          id: 'v1',
          title: '大学サッカー部選びの基本ポイント',
          description: '自分に合った大学サッカー部を見つけるための5つのポイントを解説',
          duration: '12:30',
          thumbnail: '/images/video-thumbnails/basics-1.jpg',
          target: '全学年'
        },
        {
          id: 'v2',
          title: 'リーグレベルと実力の関係性',
          description: '1部・2部リーグの違いと自分の実力に適したレベル選択',
          duration: '10:45',
          thumbnail: '/images/video-thumbnails/basics-2.jpg',
          target: '2年'
        },
        {
          id: 'v3',
          title: '志向性別おすすめ大学の選び方',
          description: 'プロ志向・教員志向など、将来の目標別大学選択術',
          duration: '14:20',
          thumbnail: '/images/video-thumbnails/basics-3.jpg',
          target: '3年'
        }
      ]
    },
    {
      id: 'costs',
      title: '費用・奨学金について',
      description: '大学進学にかかる費用と支援制度',
      videos: [
        {
          id: 'v4',
          title: '大学サッカー部の年間費用を徹底解説',
          description: '授業料・部費・遠征費など、実際にかかる費用の内訳',
          duration: '13:15',
          thumbnail: '/images/video-thumbnails/costs-1.jpg',
          target: '全学年'
        },
        {
          id: 'v5',
          title: 'スポーツ奨学金の取得方法',
          description: '奨学金の種類と申請のポイント、選考基準を詳しく説明',
          duration: '11:50',
          thumbnail: '/images/video-thumbnails/costs-2.jpg',
          target: '3年'
        }
      ]
    },
    {
      id: 'admission',
      title: '入部準備・選考対策',
      description: 'セレクション対策と入部手続き',
      videos: [
        {
          id: 'v6',
          title: 'セレクション合格のための準備',
          description: '技術面・体力面・メンタル面での準備方法を解説',
          duration: '15:00',
          thumbnail: '/images/video-thumbnails/admission-1.jpg',
          target: '3年'
        },
        {
          id: 'v7',
          title: '推薦入部の条件と対策',
          description: 'スポーツ推薦での入部条件と面接対策',
          duration: '9:30',
          thumbnail: '/images/video-thumbnails/admission-2.jpg',
          target: '3年'
        }
      ]
    },
    {
      id: 'interviews',
      title: '現役選手・OBインタビュー',
      description: '実体験に基づくリアルな声',
      videos: [
        {
          id: 'v8',
          title: '早稲田大学現役選手インタビュー',
          description: '関東1部でプレーする現役選手の1日と大学生活',
          duration: '13:15',
          thumbnail: '/images/video-thumbnails/interview-1.jpg',
          target: '全学年'
        },
        {
          id: 'v9',
          title: 'Jリーガー OB座談会',
          description: '大学サッカー部出身のJリーガーが語る成功の秘訣',
          duration: '14:45',
          thumbnail: '/images/video-thumbnails/interview-2.jpg',
          target: '2年'
        }
      ]
    }
  ];

  // フィルター用のセクション一覧
  const sectionFilters = [
    { id: 'all', label: 'すべて' },
    ...videoSections.map(section => ({ id: section.id, label: section.title }))
  ];

  // フィルタリングされた動画
  const filteredVideos = videoSections.reduce((acc, section) => {
    if (selectedSection === 'all' || selectedSection === section.id) {
      const sectionVideos = section.videos.filter(video => 
        searchQuery === '' || 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (sectionVideos.length > 0) {
        acc.push({ ...section, videos: sectionVideos });
      }
    }
    return acc;
  }, []);

  // 対象学年別の色
  const getTargetColor = (target) => {
    switch (target) {
      case '全学年': return 'bg-blue-100 text-blue-700';
      case '1年': return 'bg-green-100 text-green-700';
      case '2年': return 'bg-yellow-100 text-yellow-700';
      case '3年': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // 動画カードコンポーネント
  const VideoCard = ({ video, sectionTitle }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* サムネイル部分 */}
      <div className="relative aspect-video bg-gray-200">
        {isPremium ? (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
            <div className="text-center">
              <Play size={48} className="text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">動画プレイヤー</p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full bg-gradient-to-br from-gray-200 to-gray-300">
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center text-white">
                <Lock size={32} className="mx-auto mb-2" />
                <p className="text-sm">プレミアム限定</p>
              </div>
            </div>
            {/* モックサムネイル */}
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 opacity-30" />
          </div>
        )}
        
        {/* 再生時間 */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
          <Clock size={12} className="mr-1" />
          {video.duration}
        </div>
        
        {/* プレミアムバッジ */}
        {!isPremium && (
          <div className="absolute top-2 right-2">
            <PremiumBadge size="xs" />
          </div>
        )}
      </div>
      
      {/* 動画情報 */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
            {video.title}
          </h3>
        </div>
        
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {video.description}
        </p>
        
        <div className="flex items-center justify-end">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTargetColor(video.target)}`}>
            対象: {video.target}
          </span>
        </div>
        
        {/* プレミアム制限の場合のアクション */}
        {!isPremium && (
          <button 
            onClick={onUpgradeToPremium}
            className="w-full mt-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg text-xs font-medium hover:from-yellow-600 hover:to-orange-600 transition-colors"
          >
            <Crown size={14} className="inline mr-1" />
            プレミアムで視聴
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {/* ナビゲーション */}
      <div className="flex justify-between items-center mb-6">
        <button 
          className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
          onClick={onBack}
        >
          <ChevronLeft size={20} className="mr-2" />
          <span className="hidden sm:inline">一覧に戻る</span>
          <span className="sm:hidden">戻る</span>
        </button>
      </div>

      {/* ヘッダー部分 */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
        {/* デスクトップ版 */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Play size={24} className="text-blue-600 mr-3" />
              セミナー動画ライブラリ
            </h1>
            {!isPremium && <PremiumBadge className="ml-3" />}
          </div>
        </div>

        {/* モバイル版 */}
        <div className="md:hidden space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-gray-900 flex items-center">
              <Play size={20} className="text-blue-600 mr-2" />
              動画ライブラリ
            </h1>
            {!isPremium && <PremiumBadge size="xs" />}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-2">
          {isPremium 
            ? '大学サッカー部選びに役立つセミナー動画をすべて視聴できます（全動画15分以内）' 
            : 'プレミアムプランで全ての動画を視聴可能になります（全動画15分以内）'
          }
        </p>
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="space-y-4">
          {/* 検索バー */}
          <div className="relative">
            <input
              type="text"
              placeholder="動画を検索..."
              className="w-full p-3 pl-10 border rounded-md text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
          
          {/* セクションフィルター */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter size={16} className="text-gray-500 flex-shrink-0" />
            {sectionFilters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedSection(filter.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedSection === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* プレミアム制限バナー（フリープランのみ） */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-4 sm:p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center">
            <Lock size={20} className="text-yellow-600 mr-3" />
            <div>
              <h3 className="font-semibold text-yellow-800">動画視聴はプレミアム限定</h3>
              <p className="text-sm text-yellow-700 mt-1">
                全ての動画を視聴するにはプレミアムプランにアップグレードしてください。
              </p>
              <button 
                onClick={onUpgradeToPremium}
                className="mt-2 bg-yellow-600 text-white px-4 py-1.5 rounded text-sm hover:bg-yellow-700 transition-colors"
              >
                プレミアムプランを見る
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 動画セクション */}
      <div className="space-y-8">
        {filteredVideos.map(section => (
          <div key={section.id}>
            {/* セクションヘッダー */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h2>
              <p className="text-gray-600 text-sm">{section.description}</p>
            </div>
            
            {/* 動画グリッド */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.videos.map(video => (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  sectionTitle={section.title}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 検索結果がない場合 */}
      {filteredVideos.length === 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-gray-500">
            <p>検索条件に一致する動画が見つかりませんでした。</p>
            <p className="text-sm mt-2">検索条件を変更してもう一度お試しください。</p>
          </div>
        </div>
      )}

      {/* CSS for line-clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default VideoLibraryView;