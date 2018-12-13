using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeSearch.Models;

namespace EmployeeSearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly SearchContext _context;

        public StatisticsController(SearchContext context)
        {
            _context = context;
        }

        [HttpGet("BigCompanies")]
        public async Task<ActionResult<IEnumerable<Company>>> GetBigCompanies()
        {
            var companies = _context.Companies.AsNoTracking()
                .Include("Vacancies");
                //.Where(el => el.Vacancies.Count > 1).OrderByDescending(el => el.Vacancies);
            var result = await companies.ToListAsync();
            foreach (var company in result)
            {
                foreach (var vacancy in company.Vacancies)
                {
                    vacancy.Company = null;
                }
            }
            return result;
        }

        [HttpGet("MainDirectories")]
        public async Task<ActionResult<IEnumerable<Person>>> GetMainDirectories()
        {
            var peopleSource = _context.Persons.AsNoTracking()
                .Include("CV.Opportunities.Directory").Where(el => el.CV.Opportunities.Count >= 1);
            var people = await peopleSource.ToListAsync();
            foreach (var person in people)
            {
                person.CV.Person = null;

                person.CV.Opportunities = person.CV.Opportunities.OrderByDescending(el => el.Quantity).Take(2).ToList();

                foreach (var opp in person.CV.Opportunities)
                {
                    opp.CV = null;
                }
            }
            

            return people;

        }

    }
}
