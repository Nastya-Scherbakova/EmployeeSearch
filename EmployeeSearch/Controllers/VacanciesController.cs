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
    public class VacanciesController : ControllerBase
    {
        private readonly SearchContext _context;

        public VacanciesController(SearchContext context)
        {
            _context = context;
        }

        // GET: api/Vacancies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vacancy>>> GetVacancies()
        {
            return await _context.Vacancies.ToListAsync();
        }

        // GET: api/Vacancies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vacancy>> GetVacancy(int id)
        {
            var vacancy = await _context.Vacancies.Include("Requirments.Directory").SingleOrDefaultAsync(el=>el.Id == id);
            foreach(var req in vacancy.Requirments)
            {
                req.Vacancy = null;
            }

            if (vacancy == null)
            {
                return NotFound();
            }

            return vacancy;
        }

        [HttpGet("{id}/Candidates")]
        public async Task<ActionResult<IEnumerable<Person>>> GetCandidates(int id)
        {
            var vacancy = await _context.Vacancies.Include("Requirments.Directory").SingleOrDefaultAsync(el=>el.Id == id);
            foreach(var req in vacancy.Requirments)
            {
                req.Vacancy = null;
            }
            IQueryable<Person> queryCandidates;
            IQueryable<Person> source = _context.Persons.Include("CV.Opportunities.Directory");
            if(vacancy.Requirments.Count>0)
            {
                queryCandidates =   from p in source
                                    from op in p.CV.Opportunities
                                    from req in vacancy.Requirments
                                    where req.Directory.Id == op.Directory.Id && req.Quantity <= op.Quantity+1
                                    select p;
            }
            else queryCandidates = source.Where(el=>el.CV.Salary <= vacancy.Salary + 500);

            var candidates = await queryCandidates.ToListAsync();
            foreach(var cand in candidates)
            {
                cand.CV.Person = null;
                foreach(var opp in cand.CV.Opportunities)
                {
                    opp.CV = null;
                }
            }
            
            if (candidates == null)
            {
                return NotFound();
            }

            return candidates;
        }
        

        // PUT: api/Vacancies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVacancy(int id, Vacancy vacancy)
        {
            if (id != vacancy.Id)
            {
                return BadRequest();
            }

            _context.Entry(vacancy).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VacancyExists(id))
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

        // POST: api/Vacancies
        [HttpPost]
        public async Task<ActionResult<Vacancy>> PostVacancy(Vacancy vacancy)
        {
            var lastEl = await _context.Vacancies.LastAsync();
            vacancy.Id = lastEl.Id+1;
            _context.Vacancies.Add(vacancy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVacancy", new { id = vacancy.Id }, vacancy);
        }

        // DELETE: api/Vacancies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Vacancy>> DeleteVacancy(int id)
        {
            var vacancy = await _context.Vacancies.FindAsync(id);
            if (vacancy == null)
            {
                return NotFound();
            }

            _context.Vacancies.Remove(vacancy);
            await _context.SaveChangesAsync();

            return vacancy;
        }

        private bool VacancyExists(int id)
        {
            return _context.Vacancies.Any(e => e.Id == id);
        }
    }
}
