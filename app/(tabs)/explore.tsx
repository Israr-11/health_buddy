import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const healthArticles = [
  {
    id: 1,
    title: 'The Benefits of Staying Hydrated',
    summary: 'Learn why drinking enough water is crucial for your overall health and wellness.',
    category: 'Nutrition',
    readTime: '4 min read',
  },
  {
    id: 2,
    title: 'How to Improve Your Sleep Quality',
    summary: 'Discover practical tips to enhance your sleep and wake up feeling refreshed.',
    category: 'Sleep',
    readTime: '5 min read',
  },
  {
    id: 3,
    title: 'Building a Consistent Exercise Routine',
    summary: 'Find out how to create and stick to an exercise plan that works for your lifestyle.',
    category: 'Fitness',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'Understanding Supplement Needs',
    summary: 'Learn which supplements might benefit you based on your diet and health goals.',
    category: 'Supplements',
    readTime: '7 min read',
  },
];

const healthChallenges = [
  {
    id: 1,
    title: '10,000 Steps Challenge',
    duration: '7 days',
    participants: 1245,
  },
  {
    id: 2,
    title: 'Hydration Challenge',
    duration: '14 days',
    participants: 876,
  },
  {
    id: 3,
    title: 'Meditation Challenge',
    duration: '21 days',
    participants: 543,
  },
];

export default function ExploreScreen() {
  const [activeTab, setActiveTab] = useState('articles');
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Explore</Text>
        <Text style={[styles.subtitle, { color: colors.icon }]}>
          Discover health content and challenges
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'articles' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('articles')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'articles' ? colors.primary : colors.icon }
            ]}
          >
            Articles
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'challenges' && [styles.activeTab, { borderColor: colors.primary }]
          ]}
          onPress={() => setActiveTab('challenges')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'challenges' ? colors.primary : colors.icon }
            ]}
          >
            Challenges
          </Text>
        </TouchableOpacity>
      </View>

      {/* Articles Tab */}
      {activeTab === 'articles' && (
        <View style={styles.articlesContainer}>
          {healthArticles.map(article => (
            <TouchableOpacity 
              key={article.id}
              style={[styles.articleCard, { backgroundColor: colors.card }]}
            >
              <View style={styles.articleHeader}>
                <Text style={[styles.articleCategory, { color: colors.primary }]}>
                  {article.category}
                </Text>
                <Text style={[styles.articleReadTime, { color: colors.icon }]}>
                  {article.readTime}
                </Text>
              </View>
              <Text style={[styles.articleTitle, { color: colors.text }]}>
                {article.title}
              </Text>
              <Text style={[styles.articleSummary, { color: colors.icon }]}>
                {article.summary}
              </Text>
              <View style={styles.articleFooter}>
                <Text style={[styles.readMoreText, { color: colors.primary }]}>
                  Read more
                </Text>
                <Ionicons name="arrow-forward" size={16} color={colors.primary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <View style={styles.challengesContainer}>
          {healthChallenges.map(challenge => (
            <TouchableOpacity 
              key={challenge.id}
              style={[styles.challengeCard, { backgroundColor: colors.card }]}
            >
              <View style={styles.challengeContent}>
                <Text style={[styles.challengeTitle, { color: colors.text }]}>
                  {challenge.title}
                </Text>
                <Text style={[styles.challengeDetails, { color: colors.icon }]}>
                  Duration: {challenge.duration}
                </Text>
                <Text style={[styles.challengeDetails, { color: colors.icon }]}>
                  {challenge.participants} participants
                </Text>
              </View>
              <TouchableOpacity 
                style={[styles.joinButton, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          
          <View style={styles.createChallengeContainer}>
            <Text style={[styles.createChallengeText, { color: colors.text }]}>
              Want to create your own challenge?
            </Text>
            <TouchableOpacity 
              style={[styles.createChallengeButton, { borderColor: colors.primary }]}
            >
              <Text style={[styles.createChallengeButtonText, { color: colors.primary }]}>
                Create Challenge
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  articlesContainer: {
    padding: 15,
  },
  articleCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  articleCategory: {
    fontSize: 14,
    fontWeight: '600',
  },
  articleReadTime: {
    fontSize: 14,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  articleSummary: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  articleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 5,
  },
  challengesContainer: {
    padding: 15,
  },
  challengeCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  challengeContent: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  challengeDetails: {
    fontSize: 14,
    marginBottom: 3,
  },
  joinButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  createChallengeContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  createChallengeText: {
    fontSize: 16,
    marginBottom: 10,
  },
  createChallengeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
  },
  createChallengeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
