import unittest

def suite():
    return unittest.TestLoader().discover("bookstack.tests", pattern="*.py")