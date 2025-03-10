from django.test import TestCase
import datetime
from django.utils import timezone
from django.urls import reverse
from .models import Question

def create_question(question_text, days):
  time = timezone.now() + datetime.timedelta(days = days)
  return Question.objects.create(question_text = question_text, pub_date = time)

class QuestionViewTests(TestCase):
  def test_index_view_with_no_questions(self):
    """
    If no questions exist, an appropriate message should be displayed.
    """
    response = self.client.get(reverse('polls:index'))
    self.assertEqual(response.status_code, 200)
    self.assertContains(response, "No polls are available.")
    self.assertQuerysetEqual(response.context['latest_question_list'], [])

  def test_index_view_with_a_past_question(self):
    """
    Questions with a pub_date in the past should be displayed on the
    index page.
    """
    create_question(question_text="Past question.", days=-30)
    response = self.client.get(reverse('polls:index'))
    self.assertQuerysetEqual(
        response.context['latest_question_list'],
        ['<Question: Past question.>']
    )

  def test_index_view_with_a_future_question(self):
    """
    Questions with a pub_date in the future should not be displayed on
    the index page.
    """
    create_question(question_text="Future question.", days=30)
    response = self.client.get(reverse('polls:index'))
    self.assertContains(response, "No polls are available.")
    self.assertQuerysetEqual(response.context['latest_question_list'], [])

  def test_index_view_with_future_question_and_past_question(self):
    """
    Even if both past and future questions exist, only past questions
    should be displayed.
    """
    create_question(question_text="Past question.", days=-30)
    create_question(question_text="Future question.", days=30)
    response = self.client.get(reverse('polls:index'))
    self.assertQuerysetEqual(
        response.context['latest_question_list'],
        ['<Question: Past question.>']
    )

  def test_index_view_with_two_past_questions(self):
    """
    The questions index page may display multiple questions.
    """
    create_question(question_text="Past question 1.", days=-30)
    create_question(question_text="Past question 2.", days=-5)
    response = self.client.get(reverse('polls:index'))
    self.assertQuerysetEqual(
        response.context['latest_question_list'],
        ['<Question: Past question 2.>', '<Question: Past question 1.>']
    )

class QuestionMethodsTests(TestCase):
  def test_was_published_recently_with_future_question(self):
    time = timezone.now() + datetime.timedelta(days = 7)
    future_question = Question(pub_date = time)
    self.assertIs(future_question.was_published_recently(), False)

  def test_was_published_recently_with_old_question(self): 
    """
    was_published_recently() should return False for questions whose pub_date is older than 1 day. 
    """ 
    time = timezone.now() - datetime.timedelta(days=30) 
    old_question = Question(pub_date=time) 
    self.assertIs(old_question.was_published_recently(), False)

  def test_was_published_recently_with_recent_question(self): 
    """ 
    was_published_recently() should return True for questions whose pub_date is within the last day.
    """ 
    time = timezone.now() - datetime.timedelta(hours=1) 
    recent_question = Question(pub_date=time) 
    self.assertIs(recent_question.was_published_recently(), True)
