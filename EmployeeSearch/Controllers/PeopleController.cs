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
    public class PeopleController : ControllerBase
    {
        private readonly SearchContext _context;

        public PeopleController(SearchContext context)
        {
            _context = context;
        }

        // GET: api/People
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetPersons()
        {
            return await _context.Persons.ToListAsync();
        }

        // GET: api/People/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {
            var person = await _context.Persons.AsNoTracking().Include("CV.Opportunities.Directory")
                .SingleOrDefaultAsync(el => el.Id == id);
            person.CV.Person = null;
            foreach (var opp in person.CV.Opportunities)
            {
                opp.CV = null;
            }

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }

        // GET: api/People/5
        [HttpGet("{id}/Vacancies")]
        public async Task<ActionResult<IEnumerable<Vacancy>>> GetPersonVacancies(int id)
        {
            var person = await _context.Persons.AsNoTracking().Include("CV.Opportunities.Directory")
                .SingleOrDefaultAsync(el => el.Id == id);
            if (person == null)
            {
                return NotFound();
            }
            person.CV.Person = null;
            foreach (var opp in person.CV.Opportunities)
            {
                opp.CV = null;
            }
            var source = _context.Vacancies.Include("Requirments.Directory");
            IQueryable<Vacancy> queryVacancies;

            if (person.CV.Opportunities.Count > 0)
            {
                queryVacancies = from p in source
                                 from req in p.Requirments
                                 from op in person.CV.Opportunities
                                 where req.Directory.Id == op.Directory.Id && req.Quantity <= op.Quantity + 1
                                 select p;
            }
            else queryVacancies = source.Where(el => el.Salary + 500 >= person.CV.Salary);
            var vacancies = await queryVacancies.ToListAsync();
            foreach (var vac in vacancies)
            {
                foreach (var req in vac.Requirments)
                {
                    req.Vacancy = null;
                }
            }


            return vacancies;
        }

        // PUT: api/People/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerson(int id, Person person)
        {
            if (id != person.Id)
            {
                return BadRequest();
            }

            _context.Entry(person).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/People
        [HttpPost]
        public async Task<ActionResult<Person>> PostPerson(Person person)
        {
            var lastEl = await _context.Persons.LastAsync();
            person.Id = lastEl.Id+1;
            _context.Persons.Add(person);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPerson", new { id = person.Id }, person);
        }

        // DELETE: api/People/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Person>> DeletePerson(int id)
        {
            var person = await _context.Persons.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            _context.Persons.Remove(person);
            await _context.SaveChangesAsync();

            return person;
        }

        private bool PersonExists(int id)
        {
            return _context.Persons.Any(e => e.Id == id);
        }
    }
}
