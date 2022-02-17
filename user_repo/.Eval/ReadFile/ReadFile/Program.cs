using System;

namespace ReadFile
{
    class Program
    {
        static void Main(string[] args)
        {
            int total = 1;
            int passed = 0;
            int failed = 1;
            bool angularPassed = false;
            bool apiPassed = false;

            bool build = false;
            var array = new string[15];
            string[] lines = System.IO.File.ReadAllLines(@"C:\Users\Public\Desktop\user_repo\.Eval\user_output_angular.txt");

            foreach (var l in lines)
            {
                if (l.Contains("TOTAL:") && l.Contains("SUCCESS"))
                {
                    angularPassed = true;
                    build = true;
                    array = l.Split(" ");
                    if (l.Contains("FAILED"))
                    {
                        failed = Convert.ToInt32(array[1]);
                        passed = Convert.ToInt32(array[3]);

                    }
                    else
                    {
                        failed = 0;
                        passed = Convert.ToInt32(array[1]);
                    }
                    total = passed + failed;
                }

            }

            string[] lines_api = System.IO.File.ReadAllLines(@"C:\Users\Public\Desktop\user_repo\.Eval\user_output_api.txt");

            foreach (var l in lines_api)
            {
                if (l.Contains("Total tests:"))
                {
                    apiPassed = true;
                    total += Convert.ToInt32(l.Substring((l.IndexOf(':') + 2)));
                }
                if (l.Contains("Passed:"))
                {
                    passed += Convert.ToInt32(l.Substring((l.IndexOf(':') + 2)));
                    failed = total - passed;
                }
                //if (l.Contains("Failed:"))
                //{
                //    failed += Convert.ToInt32(l.Substring((l.IndexOf(':') + 2)));
                //}
            }
            if (apiPassed == true && angularPassed == false)
            {
                total += 47;
                failed += 47;
            }
            if (apiPassed == false && angularPassed == true)
            {
                total += 23;
                failed += 23;
            }


            Console.WriteLine("Total {0} Passed {1}  Failed {2}", total, passed, failed);

            string text = total + "  " + passed + "  " + failed;

            System.IO.File.WriteAllText(@"C:\Users\Public\Desktop\user_repo\.Eval\results.txt", text);
        }
    }
}


